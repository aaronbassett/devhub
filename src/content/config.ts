import { ContentCollections } from '@config/collections'
import { defineCollection } from "astro:content"

let configuredContentCollections: Record<
  string,
  ReturnType<typeof defineCollection>
> = {}

for (let collection of Object.values(ContentCollections)) {
  configuredContentCollections[collection.name] = defineCollection({
    type: "content",
    schema: collection.schema,
  })
}

export const collections = {
  ...configuredContentCollections,
}
