import { ExternalLinkSchema } from "@schemas/links"
import { z } from "astro:content"

export const ContentCollectionsMetaSchema = z.object({
  title: z.string(),
  tagline: z.string(),
  description: z.string(),
  icon: z.string(),
  additionalResources: z
    .array(
      z.object({
        label: z.string(),
        url: z.string(),
        icon: z.string(),
      })
    )
    .optional(),
  relatedVideoPlaylists: z.array(z.string()).optional(),
  relatedLinks: z.array(ExternalLinkSchema).optional(),
  relatedCode: z
    .array(
      z.object({
        owner: z.string(),
        repo: z.string(),
      })
    )
    .optional(),
})

export type ContentCollectionMeta = z.infer<typeof ContentCollectionsMetaSchema>
