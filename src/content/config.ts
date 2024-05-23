import { ContentCollections, DataCollections } from "@config/collections"

import { defineCollection } from "astro:content"

let configuredContentCollections: Record<
  string,
  ReturnType<typeof defineCollection>
> = {}
let configuredDataCollections: Record<
  string,
  ReturnType<typeof defineCollection>
> = {}

for (let collection of Object.values(ContentCollections)) {
  configuredContentCollections[collection.name] = defineCollection({
    type: "content",
    schema: collection.schema,
  })
}

for (let collection of Object.values(DataCollections)) {
  configuredDataCollections[collection.name] = defineCollection({
    type: "data",
    schema: collection.schema,
  })
}

export const collections = {
  ...configuredDataCollections,
  ...configuredContentCollections,
}
