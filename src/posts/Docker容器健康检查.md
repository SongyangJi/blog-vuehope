---
title: Docker容器健康检查
date: 2022-05-16 10:11:25
categories: Docker
tags: 
  - Docker
---





### 结构体定义

```json
// Health states
const (
   NoHealthcheck = "none"      // Indicates there is no healthcheck
   Starting      = "starting"  // Starting indicates that the container is not yet ready
   Healthy       = "healthy"   // Healthy indicates that the container is running correctly
   Unhealthy     = "unhealthy" // Unhealthy indicates that the container has a problem
)

// Health stores information about the container's healthcheck results
type Health struct {
   Status        string               // Status is one of Starting, Healthy or Unhealthy
   FailingStreak int                  // FailingStreak is the number of consecutive failures
   Log           []*HealthcheckResult // Log contains the last few results (oldest first)
}

// ContainerState stores container's running state
// it's part of ContainerJSONBase and will return by "inspect" command
type ContainerState struct {
   Status     string // String representation of the container state. Can be one of "created", "running", "paused", "restarting", "removing", "exited", or "dead"
   Running    bool
   Paused     bool
   Restarting bool
   OOMKilled  bool
   Dead       bool
   Pid        int
   ExitCode   int
   Error      string
   StartedAt  string
   FinishedAt string
   Health     *Health `json:",omitempty"`
}
```



### 容器状态举例

#### 正在运行、有健康检查


```json
[
    {
        "Id": "62b16c0d39e0d53cb9b650abbec981c6a05487b44ca5a3e0a70add7ab0b65cba",
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 667960,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2022-05-14T20:38:38.295539629Z",
            "FinishedAt": "0001-01-01T00:00:00Z"
        },
    // ...
    }
]
```



#### 正在运行、无健康检查

```json
[
    {
        "Id": "d8338185a6bfc54dca030c59abb5186161bf77094c1af8979c58b93540599905",
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 458280,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2022-05-14T13:02:57.171746945Z",
            "FinishedAt": "0001-01-01T00:00:00Z",
            "Health": {
                "Status": "healthy",
                "FailingStreak": 0,
                // output 为日志的输出，这里省略
                "Log": [
                    {
                        "Start": "2022-05-16T10:20:11.364683294+08:00",
                        "End": "2022-05-16T10:20:11.489168017+08:00",
                        "ExitCode": 0,
                        "Output": ""
                    },
                    {
                        "Start": "2022-05-16T10:20:41.555034247+08:00",
                        "End": "2022-05-16T10:20:41.669428317+08:00",
                        "ExitCode": 0,
                        "Output": ""
                    },
                    {
                        "Start": "2022-05-16T10:21:11.743222508+08:00",
                        "End": "2022-05-16T10:21:11.873154539+08:00",
                        "ExitCode": 0,
                        "Output": ""
                    },
                    {
                        "Start": "2022-05-16T10:21:41.942537086+08:00",
                        "End": "2022-05-16T10:21:42.074005305+08:00",
                        "ExitCode": 0,
                        "Output": ""
                    },
                    {
                        "Start": "2022-05-16T10:22:12.145717622+08:00",
                        "End": "2022-05-16T10:22:12.298673054+08:00",
                        "ExitCode": 0,
                        "Output": ""
                    }
                ]
            }
        },
    // ...
    }  
]
```



#### 正常退出


```json
[
    {
        "Id": "e6c371ee6eff329e7fea4411b3fe1f7374f155c89f0defe40469d24fe4966c84",
        "State": {
            "Status": "exited",
            "Running": false,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 0,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2022-04-05T09:35:31.758578263Z",
            "FinishedAt": "2022-04-05T09:35:31.75743118Z"
        },
    // ...
    }
]

```



#### 非正常退出

```json
[
    {
        "Id": "9960fb71ac67b3d0869ba699d722c1c2b1513e257bfa661d4357f3d0cc80712e",
        "State": {
            "Status": "exited",
            "Running": false,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 0,
            "ExitCode": 255,
            "Error": "",
            "StartedAt": "2022-04-05T20:12:33.193708879Z",
            "FinishedAt": "2022-05-07T18:10:37.476409625Z"
        },
    // ...
    }
]
```





## 实操

### 一个简单的健康检测



```go
func hasHealthCheck(ctx context.Context, containerID string) (enabled bool) {
	containerJSON, err := cli.ContainerInspect(ctx, containerID)
	if err != nil {
		log.Println("Error: [hasHealthCheck]")
		return false
	}
	if containerJSON.Config != nil {
		if containerJSON.Config.Healthcheck != nil {
			return true
		}
	}
	return
}

func checkIsRunning(ctx context.Context, containerID string) bool {
	containerJSON, err := cli.ContainerInspect(ctx, containerID)
	if err != nil {
		log.Printf("Error: [checkIsRunning] fail, err=%v", err.Error())
		return false
	}
	if containerJSON.State != nil {
		return containerJSON.State.Running
	}
	//No such container
	return false
}

func MonitorContainerHealth(ctx context.Context, containerID string) {

	containerList, err := cli.ContainerList(ctx, types.ContainerListOptions{All: true})

	if err != nil {
		log.Printf("[MonitorContainerHealth] error=%v", err)
		os.Exit(1)
	}
	containerExists := false
	for _, container := range containerList {
		if container.ID == containerID {
			containerExists = true
			break
		}
	}
	if !containerExists {
		log.Printf("[MonitorContainerHealth] container:%s not exists", containerID)
		os.Exit(1)
	}

	var checkContainerIsHealthy func(ctx context.Context, containerID string) bool

	if hasHealthCheck(ctx, containerID) {
		checkContainerIsHealthy = checkIsRunning // todo 默认
	} else {
		checkContainerIsHealthy = checkIsRunning
	}

	go func(containerIsHealthy func(ctx context.Context, containerID string) bool) {
		for {
			if !containerIsHealthy(ctx, containerID) {
				log.Printf("[MonitorContainerHealth] container:%s is not running, so the monitor process terminate...", containerID)
				os.Exit(0)
			}
			time.Sleep(time.Second) // todo default 1s
		}
	}(checkContainerIsHealthy)

}

```