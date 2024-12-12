import { getCollection } from "astro:content";
import { CollectionType } from "../types";

export const posts = (await getCollection(CollectionType.Blog)).sort((a, b) =>
  new Date(a.data.date).valueOf() > new Date(b.data.date).valueOf() ? -1 : 1,
);

export const tags = Array.from(
  new Set(
    posts
      .map((post) => {
        if (post.data.tags && post.data.tags.length) {
          return post.data.tags;
        }
        return [];
      })
      .flat(),
  ),
).sort();

export const years = Array.from(new Set(posts.map((post) => new Date(post.data.date).getFullYear().toString()))).sort();
