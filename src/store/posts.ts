// store/posts.ts
import { atom } from "nanostores";

export interface Post {
  title: string;
  author: string;
  category: string;
  date: string;
  description: string;
  content: string;
  slug: string;
}

export const postsArray = atom<Post[]>([]);
export const searchTerm = atom<string>("");

if (!import.meta.env.SSR) {
  (async () => {
    const res = await fetch("/slugs.json");
    const data = await res.json();
    return postsArray.set(data.posts);
  })();
}

export const filterPosts = (search: string) => {
  if (search === "") {
    return postsArray.get().filter((post) => post.title === "");
  }
  const searchTerm = search.toLowerCase();
  return postsArray
    .get()
    .filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.description.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.author.toLowerCase().includes(searchTerm) ||
        post.category.toLowerCase().includes(searchTerm)
    );
};
