import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

export async function getPosts() {
  const posts = await getCollection("blog");

  return posts.map((post) => ({
    title: post.data.title,
    author: post.data.author,
    category: post.data.category,
    date: post.data.date.toString(),
    description: post.data.description,
    content: post.body,
    slug: `/blog/${post.slug}`,
  }));
}

export const get: APIRoute = async function get() {
  const posts = await getPosts();
  const body = JSON.stringify({ posts });
  return {
    body,
  };
};
