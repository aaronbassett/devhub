import { z } from 'astro/zod'

export const HeadConfigSchema = z.array(
  z.object({
    /** Name of the HTML tag to add to `<head>`, e.g. `'meta'`, `'link'`, or `'script'`. */
    tag: z.enum([
      "title",
      "base",
      "link",
      "style",
      "meta",
      "script",
      "noscript",
      "template",
    ]),
    /** Attributes to set on the tag, e.g. `{ rel: 'stylesheet', href: '/custom.css' }`. */
    attrs: z
      .record(z.union([z.string(), z.boolean(), z.undefined()]))
      .optional(),
    /** Content to place inside the tag (optional). */
    content: z.string().optional(),
  })
)
