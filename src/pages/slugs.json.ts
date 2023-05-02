import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export const get: APIRoute = async function get() {
  const posts = await getCollection("blog");

  const body = JSON.stringify({
    posts: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      content: post.body,
      slug: `/blog/${post.slug}`,
    })),
  });

  return {
    body,
  };
};
