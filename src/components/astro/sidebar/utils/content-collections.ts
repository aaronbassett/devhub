import _ from "lodash"
import {
  type ContentCollection,
  ContentCollections as cc,
} from "@config/collections"

export class ContentCollections {
  private collection: string
  private collections: ContentCollection[] = Object.values(cc)
  private _current: ContentCollection
  private _others: ContentCollection[]

  constructor(collection: string) {
    this.collection = collection
    this._current = this.findCurrent()
    this._others = this.findOthers()
  }

  private findCurrent(): ContentCollection {
    const current = _.find(this.collections, { name: this.collection })
    if (current === undefined)
      throw new Error(`Collection ${this.collection} not found`)
    return current
  }

  private findOthers(): ContentCollection[] {
    return _.filter(this.collections, (collection) => {
      return collection.name !== this.collection
    })
  }

  get current(): ContentCollection {
    return this._current
  }

  get others(): ContentCollection[] {
    return this._others
  }
}
