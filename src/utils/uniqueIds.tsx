import ShortUniqueId from 'short-unique-id'
import slugify from './slugify'

/**
 * Generates a unique ID for a given string, with an optional UID length.
 *
 * @param str - The input string to generate the UID from.
 * @param length - The desired length of the unique portion of the UID. Defaults to 10.
 * @returns A string in the format `{unique-id}-{slugified-str}`.
 */
export const generateUniqueId = (str: string, length: number = 10): string => {
  const uid = new ShortUniqueId({ length, dictionary: "hex" })
  return `${uid.rnd()}-${slugify(str)}`
}

/**
 * Generates a unique ID suitable for use as an HTML element ID.
 *
 * This differs from `generateUniqueId` in that it prepends `UID-` to the generated UID
 * as it is recommended that id values do not start with numbers or hyphens.
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id
 *
 * @param str - The input string to generate the UID from.
 * @param length - The desired length of the unique portion of the UID. Defaults to 10.
 * @returns A string in the format `UID-{unique-id}-{slugified-str}`.
 */
export const generateUniqueElementId = (
  str: string,
  length: number = 10
): string => {
  const uid = generateUniqueId(str, length)
  return `UID-${uid}`
}
