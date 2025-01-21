import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_DESCRIPTION, SITE_TITLE } from "../config";
import { CollectionType } from "../types";

export async function GET(context: any) {
  const posts = await getCollection(CollectionType.Blog);
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      pubDate: new Date(post.data.date),
      link: `/${post.slug}/`,
    })),
  });
}
