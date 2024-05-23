import AutoImport from "astro-auto-import"
import customToc from "astro-custom-toc"
import { defineConfig } from "astro/config"
import expressiveCode from "astro-expressive-code"
import icon from "astro-icon"
import mdx from "@astrojs/mdx"
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections"
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers"
import react from "@astrojs/react"
import remarkMermaid from "astro-diagram/remark-mermaid"
import robotsTxt from "astro-robots-txt"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"

// https://astro.build/config
export default defineConfig({
  build: {
    format: "file",
  },
  markdown: {
    remarkPlugins: [remarkMermaid],
  },
  integrations: [
    tailwind(),
    icon(),
    sitemap(),
    robotsTxt(),
    AutoImport({ imports: [] }),
    customToc(),
    expressiveCode({
      plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
      themes: ["dracula", "github-light"],
    }),
    react(),
    mdx(),
  ],
})
