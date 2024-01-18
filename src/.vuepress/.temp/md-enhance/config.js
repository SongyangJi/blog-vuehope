import { defineClientConfig } from "@vuepress/client";
import CodeTabs from "/Users/jisongyang/WebstormProjects/blog-vuewhope/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeTabs.js";
import { hasGlobalComponent } from "/Users/jisongyang/WebstormProjects/blog-vuewhope/node_modules/vuepress-shared/lib/client/index.js";
import { CodeGroup, CodeGroupItem } from "/Users/jisongyang/WebstormProjects/blog-vuewhope/node_modules/vuepress-plugin-md-enhance/lib/client/compact/index.js";
import CodeDemo from "/Users/jisongyang/WebstormProjects/blog-vuewhope/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeDemo.js";
import MdDemo from "/Users/jisongyang/WebstormProjects/blog-vuewhope/node_modules/vuepress-plugin-md-enhance/lib/client/components/MdDemo.js";
import "/Users/jisongyang/WebstormProjects/blog-vuewhope/node_modules/vuepress-plugin-md-enhance/lib/client/styles/figure.scss";
import { useHint } from "/Users/jisongyang/WebstormProjects/blog-vuewhope/node_modules/vuepress-plugin-md-enhance/lib/client/composables/hint.js";
import "/Users/jisongyang/WebstormProjects/blog-vuewhope/node_modules/vuepress-plugin-md-enhance/lib/client/styles/hint/index.scss";
import Tabs from "/Users/jisongyang/WebstormProjects/blog-vuewhope/node_modules/vuepress-plugin-md-enhance/lib/client/components/Tabs.js";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    if(!hasGlobalComponent("CodeGroup", app)) app.component("CodeGroup", CodeGroup);
    if(!hasGlobalComponent("CodeGroupItem", app)) app.component("CodeGroupItem", CodeGroupItem);
    app.component("CodeDemo", CodeDemo);
    app.component("MdDemo", MdDemo);
    app.component("Tabs", Tabs);
  },
  setup: () => {
useHint();
  }
});
