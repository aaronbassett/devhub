import type { AstroBuiltinAttributes } from "astro"
import type { HTMLAttributes } from "astro/types"
import { z } from "astro:content"

// HTML attributes that can be added to an anchor element, validated as
// `Record<string, string | number | boolean | undefined>` but typed as `HTMLAttributes<'a'>`
// for user convenience.
export const linkHTMLAttributesSchema = z.record(
  z.union([z.string(), z.number(), z.boolean(), z.undefined()])
) as z.Schema<
  Omit<HTMLAttributes<"a">, keyof AstroBuiltinAttributes | "children">
>

export const ExternalLinkSchema = z.object({
  text: z.string(),
  href: z.string().url(),
  attrs: linkHTMLAttributesSchema.optional(),
  validate: z.boolean().optional(),
})

export const InternalLinkSchema = z.object({
  text: z.string(),
  collection: z.string(),
  slug: z.string(),
  attrs: linkHTMLAttributesSchema.optional(),
  validate: z.boolean().optional(),
})

export const LinkSchema = z.union([ExternalLinkSchema, InternalLinkSchema])

export const PrevNextSchema = z.union([z.boolean(), LinkSchema])
