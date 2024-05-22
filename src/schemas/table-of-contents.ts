import { config } from '@config/config'
import { z } from 'astro/zod'

const defaults = {
  minHeadingLevel: config.toc.MIN_HEADING_LEVEL,
  maxHeadingLevel: config.toc.MAX_HEADING_LEVEL,
}

export const TableOfContentsSchema = () =>
  z
    .union([
      z.object({
        /** The level to start including headings at in the table of contents. */
        minHeadingLevel: z
          .number()
          .int()
          .min(1)
          .max(6)
          .optional()
          .default(defaults.minHeadingLevel),
        /** The level to stop including headings at in the table of contents. */
        maxHeadingLevel: z
          .number()
          .int()
          .min(1)
          .max(6)
          .optional()
          .default(defaults.maxHeadingLevel),
      }),
      z.boolean().transform((enabled) => (enabled ? defaults : false)),
    ])
    .refine(
      (toc) => (toc ? toc.minHeadingLevel <= toc.maxHeadingLevel : true),
      {
        message:
          "minHeadingLevel must be less than or equal to maxHeadingLevel",
      }
    )
