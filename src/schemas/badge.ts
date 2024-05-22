import { z } from 'astro/zod'

export const BadgeSchema = z.object({
  text: z.string(),
  type: z
    .enum(["caution", "danger", "note", "subtle", "success"])
    .default("note"),
})
