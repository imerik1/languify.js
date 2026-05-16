import { defineConfig } from 'vitepress'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

export default defineConfig({
  title: "languify.js",
  description: "Languify.JS is a library for using tools from other programming languages in javascript",
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin)
    },
  },
  appearance: "force-dark",
  themeConfig: {
    nav: [
      { text: 'Docs', link: '/getting-started' },
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting started', link: '/getting-started' },
        ]
      },
      {
        text: 'Rust',
        items: [
          { text: 'Option', link: '/rust/option' },
          { text: 'Match', link: '/rust/match' },
          { text: 'Result', link: '/rust/result' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/imerik1/languify.js' }
    ]
  },
  outDir: "../dist/docs"
})
