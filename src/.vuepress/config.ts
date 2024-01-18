import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "常潇的技术站",
  description: "来这看看blog~~",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
