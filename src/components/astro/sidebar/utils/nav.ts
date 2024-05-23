import _ from "lodash"
import { BaseContentCollectionSchema } from "@schemas/collections/content/base"
import { SidebarEntrySchema } from "@schemas/sidebar"
import { toSentenceCase } from "@src/utils/typography/case-conversion"
import type { DocsEntry, Path } from "@src/utils/routing/static-paths"
import { type ContentCollectionKey } from "astro:content"

import { z } from "astro:content"

type BaseData = z.infer<typeof BaseContentCollectionSchema>

type SidebarConfig = z.infer<typeof SidebarEntrySchema>

export type Leaf = Partial<SidebarConfig> & {
  entry: DocsEntry
  slug: string | undefined
  active: boolean
}

export type Branch = {
  id: string
  label: string
  children: (Branch | Leaf)[]
  order: number
  hasIndex: boolean
  indexSlug: string | undefined
  isOpen: boolean
}

// Is a tree with only leaf any less of a tree?
export type Tree = Branch | Leaf

export class NavTree {
  private paths: Path<DocsEntry>[]
  private currentPage: string
  private _tree: Tree

  constructor(paths: Path<DocsEntry>[], currentPage: string) {
    this.paths = paths
    this.currentPage = currentPage
    this._tree = this.buildTree()
  }

  private buildTree(): Tree {
    const root: Tree = this.defaultBranch("root")

    _.each(this.paths, (path) => {
      const data = path.props.entry.data as BaseData

      const pathParts = path.props.entry.id.split("/")
      let currentLevel = root

      _.each(pathParts, (part, index) => {
        if (index === pathParts.length - 1) {
          currentLevel.children.push({
            ...data.sidebar,
            entry: path.props.entry,
            slug: path.params.slug,
            label: this.labelForEntry(path.props.entry),
            order: this.entryOrder(path.props.entry),
            active: this.isActive(path),
          })

          currentLevel.order = this.groupOrder(
            data.sidebar?.group,
            currentLevel.order
          )
        } else {
          const id = `${part}-${index}`
          let existingLevel = _.find(currentLevel.children, {
            id: id,
          }) as Branch
          if (!existingLevel) {
            existingLevel = this.defaultBranch(part, index)
            currentLevel.children.push(existingLevel)
          }
          currentLevel = existingLevel
        }
      })
    })

    return this.setBranchesWithIndexes(this.setOpenGroups(this.sortTree(root)))
  }

  private defaultBranch(id: string, index: number = 0): Branch {
    return {
      id: `${id}-${index}`,
      label: toSentenceCase(id),
      children: [],
      order: 9000,
      hasIndex: false,
      indexSlug: undefined,
      isOpen: false,
    }
  }

  private isActive(path: Path<DocsEntry>): boolean {
    const urlPath =
      path.params.slug === undefined
        ? path.props.collection
        : `${path.props.collection}/${path.params.slug}`
    return (
      urlPath.replace(/^\/|\/$/g, "") ===
      this.currentPage.replace(/^\/|\/$/g, "")
    ) // remove any leading/trailing slashes
  }

  private labelForEntry(entry: DocsEntry): string {
    const data = entry.data as BaseData
    if (data.sidebar?.label) {
      return toSentenceCase(data.sidebar.label)
    } else if (data.title) {
      return toSentenceCase(data.title)
    } else {
      const filename = entry.id.split("/").pop()?.split(".")[0] as string
      return toSentenceCase(filename)
    }
  }

  private entryOrder(entry: DocsEntry): number {
    const data = entry.data as BaseData
    const filename = entry.id.split("/").pop()?.split(".")[0] as string
    return filename === "index" ? 0 : data.sidebar?.order ?? 9000
  }

  private groupOrder(group: SidebarConfig["group"], current: number): number {
    return group?.order && group.order < current ? group.order : current
  }

  private sortTree(node: Tree): Tree {
    if ("children" in node) {
      // must be a branch
      node.children = _.sortBy(node.children, "order")
      _.each(node.children, (child) => {
        this.sortTree(child)
      })
    }
    return node
  }

  private setOpenGroups(node: Tree): Tree {
    // This method sets the "isOpen" property of each branch in the tree based on the active state of its descendants.
    // If any descendant leaf or branch is active, the branch is considered open.
    // The method recursively traverses the tree and updates the "isOpen" property accordingly.

    // Check if the current node is a branch
    if ("children" in node) {
      // Iterate over the children of the branch
      for (const child of node.children) {
        // Recursively call the method for each child
        this.setOpenGroups(child)

        // If any descendant leaf or branch is active or open, set the branch to open
        if (
          ("active" in child && child.active) ||
          ("isOpen" in child && child.isOpen)
        ) {
          node.isOpen = true
          break
        }
      }
    }

    return node
  }

  private setBranchesWithIndexes(node: Tree): Tree {
    const indexChild = (
      children: (Leaf | Branch)[]
    ): [boolean, string | undefined] => {
      for (const child of children) {
        if (
          "entry" in child &&
          child.entry.id.split("/").pop()?.split(".")[0] === "index"
        ) {
          return [true, child.slug]
        }
      }

      return [false, undefined]
    }

    if ("children" in node) {
      ;[node.hasIndex, node.indexSlug] = indexChild(node.children)
      node.children = _.map(node.children, (child) => {
        return this.setBranchesWithIndexes(child)
      })
    }

    return node
  }

  public get tree(): Tree {
    return this._tree
  }
}
