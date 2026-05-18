import { defineConfig } from "vitepress";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import packageJson from "../../package.json";

const buildVersion = (version: string) => {
  return `v${version}`;
};

const VERSION = process.env?.LATEST_VERSION || buildVersion(packageJson.version);
const IS_DEV = process.env.NODE_ENV === "development";

if (process.env?.LATEST_VERSION && process.env.LATEST_VERSION !== "latest") {
  process.exit(1);
}

export default defineConfig({
  title: "languify.js",
  lang: "en-US",
  description:
    "Languify.JS is a library for using tools from other programming languages in javascript",
  base: `/docs/${VERSION === "latest" ? "" : `${VERSION}`}`,
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin);
    },
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
    ],
    socialLinks: [
      {
        icon: "github",
        link: `https://github.com/imerik1/languify.js/tree/${VERSION === "latest" ? "main" : VERSION}`,
      },
      {
        icon: "vitest",
        link: `/coverage${VERSION === "latest" ? "/" : `/${VERSION}`}`,
      },
    ],
  },
  outDir: `../dist/site/docs${VERSION === "latest" ? "" : `/${VERSION}`}`,
});
