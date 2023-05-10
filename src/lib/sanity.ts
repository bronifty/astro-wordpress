import { createClient } from "@sanity/client";
import type { PortableTextBlock } from "@portabletext/types";
import type { Image, ImageAsset, Slug } from "@sanity/types";
import imageUrlBuilder from "@sanity/image-url";
import groq from "groq";

// if (
//   !import.meta.env.PUBLIC_SANITY_PROJECT_ID ||
//   !import.meta.env.PUBLIC_SANITY_DATASET
// ) {
//   throw new Error("Did you forget to run sanity init --env?");
// }

export const client = createClient({
  projectId: process.env.SANITY_BLOG_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || "production",
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: "2023-03-20", // date of setup
});

const builder = imageUrlBuilder(client);

export function urlFor(source: Image) {
  return builder.image(source);
}

export async function getPosts(): Promise<Post[]> {
  return await client.fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
  );
}

export async function getPost(slug: string): Promise<Post> {
  return await client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]`,
    {
      slug,
    }
  );
}

export interface Post {
  _type: "post";
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  mainImage?: ImageAsset;
  body: PortableTextBlock[];
}
