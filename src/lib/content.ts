import { getCollection } from "astro:content";
import type { CollectionEntry, CollectionKey } from "astro:content";

export async function getSingleton<C extends CollectionKey>(
  collection: C,
): Promise<CollectionEntry<C>> {
  const singleton = await getCollection(
    collection,
    ({ id }) => id === collection,
  ).then(([entry]) => entry);

  if (!singleton) {
    throw new Error(
      `Singleton not found! Could not find an entry with name "${collection}" in collection "${collection}".`,
    );
  }

  return singleton;
}
