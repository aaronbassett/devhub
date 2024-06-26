import { BadgeSchema } from "@schemas/badge"
import { z } from "astro/zod"

export const SidebarEntrySchema = z.object({
  /**
   * The order of this page in the navigation.
   * Pages are sorted by this value in ascending order.
   * If a page does not have an order set, it will be assigned a value of 9000
   * except index pages which receive a value of 0.
   */
  order: z.number().optional(),

  /**
   * The label for this page in the navigation.
   * Defaults to the page `title` if not set.
   */
  label: z.string().optional(),

  /**
   * Prevents this page from being included in autogenerated sidebar groups.
   */
  hidden: z.boolean().default(false),

  /**
   * Adds a badge to the sidebar link.
   * Styles include "caution", "danger", "note", "subtle", "success".
   */
  badge: BadgeSchema.optional(),

  /**
   * Options for sidebar groups
   */
  group: z
    .object({
      /**
       * The order of this page's group in the navigation.
       * Groups are sorted by this value in ascending order.
       * Where multiple pages in the same group attempt to set the order the lowest value wins.
       * (to avoid confusion I recommend only using this option on index pages)
       */
      order: z.number().optional(),
    })
    .optional(),
})
