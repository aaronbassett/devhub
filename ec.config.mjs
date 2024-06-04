import expressiveCode from "astro-expressive-code"
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections"
import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers"

export default expressiveCode({
  plugins: [pluginCollapsibleSections(), pluginLineNumbers()],
  themes: ["dracula", "github-light"],
})
