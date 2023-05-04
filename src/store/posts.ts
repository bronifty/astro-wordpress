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
  window.searchTerm = searchTerm;
}

if (!import.meta.env.SSR) {
  (async () => {
    const res = await fetch("/slugs.json");
    const data = await res.json();
    return postsArray.set(data.posts);
  })();
}
