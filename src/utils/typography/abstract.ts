import markdownit from "markdown-it"
import { fromHtml } from "hast-util-from-html"
import { toHtml } from "hast-util-to-html"
import type { RootContent, ElementContent } from "hast"

const abstractFromHast = (
  children: RootContent[] | ElementContent[],
  currentText: string,
  max: number
): ElementContent[] => {
  const allowedElements = []
  let abstractChildren: ElementContent[] = []
  outerLoop: for (const child of children) {
    if (child.type === "element") {
      if (child.children) {
        const abstracted = abstractFromHast(child.children, currentText, max)
        abstractChildren.push(...abstracted)

        // Did we add all the children? If not, break out of the loop.
        if (abstractChildren.length !== child.children.length) {
          break outerLoop
        }
      } else {
        abstractChildren.push(child)
      }
    } else if (child.type === "text") {
      // Can we fit all the text into the abstract?
      if (currentText.length + child.value.length < max) {
        currentText += child.value
        abstractChildren.push(child)
      } else {
        // Can we fit some of the words?
        const words = child.value.split(" ")
        let childText = ""
        for (const word of words) {
          if (currentText.length + childText.length + word.length < max) {
            childText += word + " "
          } else {
            child.value = childText
            abstractChildren.push(child)
            break outerLoop
          }
        }
      }
    }
  }

  return abstractChildren
}

export const abstractFromMarkdown = (
  markdown: string,
  max: number = 1
): string => {
  const md = markdownit()
  const html = md.render(markdown)
  let tree = fromHtml(html, { fragment: true })
  let abstractChildren = []
  let count = 0

  for (const child of tree.children) {
    if (child.type === "element" && child.tagName === "p") {
      if (count < max) {
        abstractChildren.push(child)
        count++
      } else {
        break
      }
    } else {
      abstractChildren.push(child)
    }
  }

  tree.children = abstractChildren

  return toHtml(tree)
}
