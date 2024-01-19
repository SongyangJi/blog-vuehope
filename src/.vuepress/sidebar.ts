import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    // {
    //   text: "如何使用",
    //   icon: "laptop-code",
    //   prefix: "demo/",
    //   link: "demo/",
    //   children: "structure",
    // },
    {
      text: "技术文章",
      icon: "book",
      prefix: "posts/",
      link: "技术/",
      children: "structure",
    },
    "intro",
  ],
});
