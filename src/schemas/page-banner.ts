import { HtmlMarkdownString } from '@schemas/html-markdown-string'
import { LinkSchema } from '@schemas/links'
import { z } from 'astro/zod'

export const PageBannerSchema = z.object({
  text: HtmlMarkdownString,
  dismissible: z.boolean().optional(),
  callToAction: z
    .object({
      link: LinkSchema,
    })
    .optional(),
  type: z
    .enum(["caution", "danger", "note", "subtle", "success"])
    .default("note"),
})
