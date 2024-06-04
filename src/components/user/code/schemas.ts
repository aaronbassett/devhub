import _ from "lodash"
import { grammars } from "tm-grammars"
import { z } from "astro/zod"

//@ts-expect-error: tm-grammars is always going to have >1 grammar name
const languages: readonly [string, ...string[]] = _.map(
  grammars,
  (grammar) => grammar.name
)

const DiffSchema = z.union([
  z.object({
    /**
     * URL of the code to fetch
     */
    url: z.string().url(),

    /**
     * Whether to verify the code against a different location
     */
    enabled: z
      .boolean()
      .default(process.env.REMOTE_CODE_DIFF_DISABLED === undefined),

    /**
     * Notification level
     */
    level: z.enum(["ERROR", "WARN", "INFO"]).default("ERROR"),

    /**
     * What part of the content to diff
     *  - FILE: diff the complete contents of the requested file
     *  - LINES: only diff the lines specified by the lines or tags properties
     *
     * @default LINES
     */
    contentToDiff: z.enum(["FILE", "LINES"]).default("FILE"),
  }),
  z.object({ enabled: z.literal(false) }),
])

const MarkerDefinitionSchema = z.union([
  z.string(),
  z.instanceof(RegExp),
  z.number(),
  z.object({ range: z.string(), label: z.string().optional() }),
])

const RemoteCodePropsBase = z.object({
  /**
   * URL of the code to fetch
   */
  url: z.string().url(),

  /**
   * Remote code to diff the main code against
   * This is normally the most recent version of the code, the branch HEAD
   *
   * Diff will only be performed on a cache miss for the main code
   */
  diff:
    process.env.REMOTE_CODE_DIFF_DISABLED === undefined
      ? DiffSchema.default({ enabled: false }).optional()
      : z.object({ enabled: z.literal(false) }).optional(),

  /**
   * The language of the code
   * Supports all languages listed here: https://github.com/shikijs/shiki/blob/main/docs/languages.md#all-languages
   */
  lang: z.enum(languages),

  /**
   * Optional line numbers marking the beginning and end of content to include
   * Also supports Github line syntax in URL (e.g. #L1-L5)
   *
   * If lines is specified then GitHub line syntax in URL will be ignored
   */
  lines: z
    .union([
      z.string(),
      z.array(z.object({ start: z.number(), end: z.number() })),
      z.object({ start: z.number(), end: z.number() }),
    ])
    .optional(),

  /**
   * Optional tags marking beginning and end of content to include
   * Loosely based on https://docs.asciidoctor.org/asciidoc/latest/directives/include-tagged-regions/
   *
   * - nest tags with semi-colons (example;demo1,example;demo2)
   * - wildcards (*,**)
   *   - * Selects all tagged regions in the document. Does not select lines outside of tagged regions.
   *   - ** Selects all the lines in the document, except for lines that contain a tag directive
   * - negation (!)
   *
   * Examples:
   * - foo;bar - Selects only regions tagged bar that are within a region tagged foo
   * - foo;!bar - Selects regions tagged foo, but excludes any nested regions tagged bar
   * - foo;!* - Selects only regions tagged foo, but excludes any nested tagged regions
   *
   * Notes:
   * - Tags are processed in order they're supplied
   * - Each tag is applied to the entire file contents
   * - Only the first matching region is included for each tag or nested tag
   * - Returned lines will be the concatenation of the result of all tags
   *
   * Can be
   * - a single tag "example"
   * - a comma delimited list of tags "example,second-example"
   * - an array of tags ["example", "second-example"]
   */
  tags: z.union([z.string(), z.array(z.string())]).optional(),

  /**
   * Throw an error if a tag does not exist, or a line number is out of range
   *
   * @default: true
   */
  strict: z.boolean().default(true).optional(),

  /**
   * The code block’s locale (e.g. en-US or de-DE).
   * This is used by expressive-code plugins to display localized strings
   * depending on the language of the containing page.
   *
   * @default: en-US
   */
  locale: z.string().default("en-US").optional(),

  /**
   * Depending on the frame type (code or terminal), this title is displayed by the frames plugin either as an open file tab label or as a terminal window title.
   */
  title: z.string().optional(),

  /**
   * The code block’s frame type.
   *
   * @default "auto"
   */
  frame: z.enum(["auto", "code", "terminal", "none"]).optional(),

  /**
   * Defines the code block’s text & line markers.
   * https://expressive-code.com/key-features/text-markers/
   *
   */
  mark: MarkerDefinitionSchema.optional(),

  /**
   * Defines the code block’s text & line markers.
   * https://expressive-code.com/key-features/text-markers/
   *
   */
  ins: MarkerDefinitionSchema.optional(),

  /**
   * Defines the code block’s text & line markers.
   * https://expressive-code.com/key-features/text-markers/
   *
   */
  del: MarkerDefinitionSchema.optional(),

  /**
   * If true, word wrapping will be enabled for the code block,
   * causing lines that exceed the available width to wrap to the next line.
   * You can use the preserveIndent option to control how wrapped lines are indented.
   *
   * @default false
   */
  wrap: z.boolean().default(false).optional(),

  /**
   * If true, wrapped parts of long lines will be aligned with their line’s indentation level,
   * making the wrapped code appear to start at the same column.
   * This increases readability of the wrapped code and can be especially useful for
   * languages where indentation is significant, e.g. Python.
   * If false, wrapped parts of long lines will always start at column 1.
   * This can be useful to reproduce terminal output.
   *
   * @default true
   */
  preserveIndent: z.boolean().default(true).optional(),

  /**
   * Attempt to strip comment markers
   * Useful if code being referenced is an example in a doc-comment or similar
   *
   * @default false
   */
  stripCommentMarkers: z.boolean().default(false).optional(),

  /**
   * Optional comment marker regex
   *
   * If supplying your own RegEx it must have the "g" flag as we use `replaceAll()`
   *
   * @default new RegExp(/(?:#|\/\/!?|\/?\*)\s/, "gm")
   *
   */
  commentMarkersRegEx: z
    .instanceof(RegExp)
    .default(new RegExp(/(?:#|\/\/!?|\/?\*)\s/, "gm"))
    .optional(),
})

export const RemoteCodePropsSchema = RemoteCodePropsBase
export type RemoteCodeProps = z.infer<typeof RemoteCodePropsSchema>
export type DiffProps = z.infer<typeof DiffSchema>
