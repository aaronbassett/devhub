import ShortUniqueId from "short-unique-id"
import slugify from "./slugify"

/**
 * Generates a unique ID for a given string, with an optional UID length.
 *
 * @param str - The input string to generate the anchor ID from.
 * @param length - The desired length of the unique ID portion of the anchor ID. Defaults to 10.
 * @returns A string in the format `{slugified-str}-{unique-id}`.
 */
export const generateUniqueElementId = (
  str: string,
  length: number = 10
): string => {
  const uid = new ShortUniqueId({ length, dictionary: "hex" })
  return `id-${uid.rnd()}-${slugify(str)}`
}
