import { z } from "astro:content"

export const PersonasSchema = z.object({
  label: z.string(),
  title: z.string(),
  description: z.string(),
})
