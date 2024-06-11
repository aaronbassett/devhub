/**
 * Converts a string to a URL-friendly slug.
 *
 * @param str - The input string to be slugified.
 * @returns The slugified string.
 */
export default function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "-")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
