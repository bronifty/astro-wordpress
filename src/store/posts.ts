// store/posts.ts
import { atom } from "nanostores";

interface Post {
  title: string;
  description: string;
  content: string;
  slug: string;
}

export const postsArray = atom<Post[]>([]);
// export const addPost = (post: Post) =>
//   postsArray.set((posts) => [...posts, post]);
export const addPosts = (posts: Post[]) => postsArray.set(posts);

// export const counter = atom(0);
// export const increment = (count) => counter.set(count + 1);
