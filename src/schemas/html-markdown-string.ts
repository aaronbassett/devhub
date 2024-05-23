import { z } from 'astro/zod'

export const HtmlMarkdownString = z.union([
  z.string(),
  z.object({ markdown: z.string() }),
  z.object({ html: z.string() }),
])
