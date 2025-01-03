import { getCollection } from "astro:content";
import { CollectionType } from "../types";

export const posts = (await getCollection(CollectionType.Blog, ({ data }) => {
  // don't return draft posts
  return data.draft !== true;
})).sort((a, b) =>
  new Date(a.data.date).valueOf() > new Date(b.data.date).valueOf() ? -1 : 1,
);

export const getPostsByLang = (lang?: string) => {
  if (!lang) return posts
  return posts.filter((post) => post.slug.startsWith(lang));
};

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
