// store/posts.ts
import { atom, computed } from "nanostores";

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

export const filteredPosts = computed(searchTerm, (search) => {
  if (search === "") {
    return postsArray.get().filter((post) => post.title === "");
  }
  return postsArray
    .get()
    .filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.get().toLowerCase()) ||
        post.description
          .toLowerCase()
          .includes(searchTerm.get().toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.get().toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.get().toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.get().toLowerCase())
    );
});
