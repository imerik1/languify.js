import { defineConfig } from "vitepress";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import packageJson from "../../package.json";
import { buildVersion, parse } from "../.utils/version";

const VERSION = `${buildVersion(parse(buildVersion(packageJson.version)).major)}`;
// const IS_DEV = process.env.NODE_ENV === "development";

export default defineConfig({
  title: `languify.js`,
  lang: "en-US",
  description:
    "Languify.JS is a library for using tools from other programming languages in javascript",
  base: `/${VERSION}/docs`,
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin);
    },
  },
  sitemap: {
    hostname: `https://languifyjs.erikmarques.com.br/${VERSION}/docs`,
  },
  appearance: "force-dark",
  themeConfig: {
    nav: [{ text: "Docs", link: "/getting-started" }],
    sidebar: [
      {
        text: "Introduction",
        items: [{ text: "Getting started", link: "/getting-started" }],
      },
      {
        text: "Rust",
        items: [
          { text: "Option", link: "/rust/option" },
          { text: "Match", link: "/rust/match" },
          { text: "Result", link: "/rust/result" },
        ],
      },
      {
        text: "Java",
        items: [
          { text: "Optional", link: "/java/optional" },
          { text: "Exception", link: "/java/exception" },
        ],
      },
    ],
    socialLinks: [
      {
        icon: "github",
        link: `https://github.com/imerik1/languify.js/tags`,
      },
      {
        icon: "vitest",
        link: `/${VERSION}/coverage`,
      },
    ],
  },
  outDir: `../dist/site/${VERSION}/docs`,
});
