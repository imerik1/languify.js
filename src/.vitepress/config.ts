import { defineConfig, type HeadConfig } from "vitepress";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import packageJson from "../../package.json";
import { buildVersion, parse } from "../.utils/version";

const VERSION = `${buildVersion(parse(buildVersion(packageJson.version)).major)}`;
const SITE_ORIGIN = "https://languifyjs.erikmarques.com.br";
const SITE_BASE = `/${VERSION}/docs/`;
const SITE_URL = `${SITE_ORIGIN}/${VERSION}/docs`;
const DEFAULT_DESCRIPTION =
  "languify.js brings the best ideas from other programming languages into JavaScript " +
  "and TypeScript through modular, typed, extensible utilities.";
const SOCIAL_IMAGE = `${SITE_URL}/social-card.svg`;

type SeoEntry = {
  title: string;
  description: string;
};

const PAGE_SEO: Record<string, SeoEntry> = {
  "index.md": {
    title: "languify.js",
    description: DEFAULT_DESCRIPTION,
  },
  "getting-started.md": {
    title: "Getting Started",
    description:
      "Install languify.js and start using language-inspired utilities such as Rust Option, Rust Result, pattern matching, and Java Optional in JavaScript.",
  },
  "project-guide.md": {
    title: "Project Guide",
    description:
      "A maintainer and AI collaborator guide for languify.js covering project intent, production builds, public assets, SEO, and extension rules.",
  },
  "rust/option.md": {
    title: "Rust Option for JavaScript",
    description:
      "Use the Rust-inspired Option type in JavaScript and TypeScript to model present and absent values without scattered null checks.",
  },
  "rust/match.md": {
    title: "Pattern Matching for JavaScript",
    description:
      "Use languify.js match helpers to handle Option, Result, nullable primitives, and custom matchable classes with predictable control flow.",
  },
  "rust/result.md": {
    title: "Rust Result for JavaScript",
    description:
      "Use the Rust-inspired Result type in JavaScript and TypeScript to represent success or failure without repetitive try/catch plumbing.",
  },
  "java/optional.md": {
    title: "Java Optional for JavaScript",
    description:
      "Use a Java-inspired Optional API in JavaScript and TypeScript for present, empty, fallback, lazy fallback, and transformation flows.",
  },
  "java/exception.md": {
    title: "Java NullPointerException for JavaScript",
    description:
      "Use the Java-inspired NullPointerException helper when a JavaScript or TypeScript operation requires a non-null value.",
  },
  "go/try.md": {
    title: "Go Try for JavaScript",
    description:
      "Use Go-style [ok, err] tuples in JavaScript and TypeScript, with synchronous and asynchronous functions handled naturally.",
  },
};

const normalizedRelativePath = (relativePath: string) => {
  return relativePath.replaceAll("\\", "/");
};

const getSeoEntry = (relativePath: string) => {
  return (
    PAGE_SEO[normalizedRelativePath(relativePath)] ?? {
      title: "languify.js documentation",
      description: DEFAULT_DESCRIPTION,
    }
  );
};

const pagePath = (relativePath: string) => {
  const path = normalizedRelativePath(relativePath);

  if (path === "index.md") {
    return "/";
  }

  return `/${path.replace(/\.md$/, ".html")}`;
};

const pageUrl = (relativePath: string) => {
  return `${SITE_URL}${pagePath(relativePath)}`;
};

const publicAsset = (path: string) => {
  return `${SITE_ORIGIN}/${path.replace(/^\//, "")}`;
};

const structuredData = (relativePath: string, seo: SeoEntry) => {
  const url = pageUrl(relativePath);

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "languify.js",
        url: `${SITE_URL}/`,
        description: DEFAULT_DESCRIPTION,
        inLanguage: "en-US",
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": `${SITE_URL}/#software`,
        name: "languify.js",
        codeRepository: "https://github.com/imerik1/languify.js",
        programmingLanguage: ["TypeScript", "JavaScript"],
        runtimePlatform: "JavaScript",
        license: "https://github.com/imerik1/languify.js/blob/main/LICENSE",
        url: `${SITE_URL}/`,
        description: DEFAULT_DESCRIPTION,
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        name: seo.title,
        url,
        description: seo.description,
        image: SOCIAL_IMAGE,
        isPartOf: {
          "@id": `${SITE_URL}/#website`,
        },
        about: {
          "@id": `${SITE_URL}/#software`,
        },
        inLanguage: "en-US",
      },
    ],
  });
};

export default defineConfig({
  title: "languify.js",
  titleTemplate: ":title | Language-inspired JavaScript utilities",
  lang: "en-US",
  description: DEFAULT_DESCRIPTION,
  base: SITE_BASE,
  lastUpdated: true,
  head: [
    ["meta", { name: "theme-color", content: "#0b1418" }],
    [
      "meta",
      {
        name: "robots",
        content: "index,follow,max-image-preview:large",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/svg+xml",
        sizes: "any",
        href: publicAsset("favicon.svg"),
      },
    ],
    ["link", { rel: "manifest", href: publicAsset("site.webmanifest") }],
  ],
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin);
    },
  },
  sitemap: {
    hostname: SITE_URL,
  },
  transformPageData(pageData) {
    const seo = getSeoEntry(pageData.relativePath);

    return {
      title: seo.title,
      description: seo.description,
    };
  },
  transformHead({ pageData }) {
    const seo = getSeoEntry(pageData.relativePath);
    const url = pageUrl(pageData.relativePath);
    const head: HeadConfig[] = [
      ["link", { rel: "canonical", href: url }],
      ["meta", { property: "og:site_name", content: "languify.js" }],
      ["meta", { property: "og:type", content: "website" }],
      ["meta", { property: "og:title", content: seo.title }],
      ["meta", { property: "og:description", content: seo.description }],
      ["meta", { property: "og:url", content: url }],
      ["meta", { property: "og:image", content: SOCIAL_IMAGE }],
      ["meta", { name: "twitter:card", content: "summary_large_image" }],
      ["meta", { name: "twitter:title", content: seo.title }],
      ["meta", { name: "twitter:description", content: seo.description }],
      ["meta", { name: "twitter:image", content: SOCIAL_IMAGE }],
      ["script", { type: "application/ld+json" }, structuredData(pageData.relativePath, seo)],
    ];

    return head;
  },
  appearance: "force-dark",
  themeConfig: {
    logo: publicAsset("logo.svg"),
    nav: [
      { text: "Docs", link: "/getting-started" },
      { text: "Project guide", link: "/project-guide" },
    ],
    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "Overview", link: "/" },
          { text: "Getting started", link: "/getting-started" },
          { text: "Project guide", link: "/project-guide" },
        ],
      },
      {
        text: "Rust-inspired",
        items: [
          { text: "Option", link: "/rust/option" },
          { text: "Match", link: "/rust/match" },
          { text: "Result", link: "/rust/result" },
        ],
      },
      {
        text: "Java-inspired",
        items: [
          { text: "Optional", link: "/java/optional" },
          { text: "Exception", link: "/java/exception" },
        ],
      },
      {
        text: "Go-inspired",
        items: [{ text: "Try", link: "/go/try" }],
      },
    ],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/imerik1/languify.js",
      },
      {
        icon: "npm",
        link: "https://www.npmjs.com/package/languify.js",
      },
      {
        icon: "vitest",
        link: `${SITE_ORIGIN}/${VERSION}/coverage/`,
      },
    ],
    search: {
      provider: "local",
    },
    outline: {
      level: [2, 3],
    },
    lastUpdatedText: "Last updated",
  },
  outDir: `../dist/site/${VERSION}/docs`,
});
