import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { enhanceAppWithTabs } from "vitepress-plugin-tabs/client";
import "./style.css";
import Layout from "./Layout.vue";

export default {
  extends: DefaultTheme,
  Layout: Layout,
  enhanceApp({ app }) {
    enhanceAppWithTabs(app);
  },
} satisfies Theme;
