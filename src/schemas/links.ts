import type { HTMLAttributes } from "astro/types"
import { z } from "astro:content"

// HTML attributes that can be added to an anchor element, validated as
// `Record<string, string | number | boolean | undefined>` but typed as `HTMLAttributes<'a'>`
// for user convenience.
export const linkHTMLAttributesSchema = z.record(
  z.union([z.string(), z.number(), z.boolean(), z.undefined()])
) as z.Schema<HTMLAttributes<"a">>

export const ExternalLinkSchema = z.object({
  text: z.string(),
  href: z.string().url(),
  newTab: z.boolean().optional(),
  validate: z.boolean().optional(),
})

export const InternalLinkSchema = z.object({
  text: z.string(),
  collection: z.string(),
  slug: z.string(),
  newTab: z.boolean().optional(),
  validate: z.boolean().optional(),
})

export const LinkSchema = z.union([ExternalLinkSchema, InternalLinkSchema])

export const PrevNextSchema = z.union([z.boolean(), LinkSchema])
export type PrevNext = z.infer<typeof PrevNextSchema>
export type InternalLink = z.infer<typeof InternalLinkSchema>
export type ExternalLink = z.infer<typeof ExternalLinkSchema>
