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

// load the postsArray when we are on the client
// canonical astro code is: if (!import.meta.env.SSR) { ... }
if (typeof window !== "undefined") {
  (async () => {
    const res = await fetch("/slugs.json");
    const data = await res.json();
    return postsArray.set(data.posts);
  })();
}

// filter the postsArray
export const filterPosts = (posts: Post[], searchTerm: string) => {
  if (searchTerm === "") {
    return posts.filter((post) => post.title === "");
  }
  return posts.filter((post) => {
    const titleMatch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const contentMatch = post.content
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const authorMatch = post.author
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const categoryMatch = post.category
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const descriptionMatch = post.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return (
      titleMatch ||
      contentMatch ||
      authorMatch ||
      categoryMatch ||
      descriptionMatch
    );
  });
};

// redundant but useful code for another possible case; computed derived values
// export const filteredPosts = computed(searchTerm, (search) => {
//   if (search === "") {
//     return postsArray.get().filter((post) => post.title === "");
//   }
//   return postsArray
//     .get()
//     .filter(
//       (post) =>
//         post.title.toLowerCase().includes(searchTerm.get().toLowerCase()) ||
//         post.description
//           .toLowerCase()
//           .includes(searchTerm.get().toLowerCase()) ||
//         post.content.toLowerCase().includes(searchTerm.get().toLowerCase()) ||
//         post.author.toLowerCase().includes(searchTerm.get().toLowerCase()) ||
//         post.category.toLowerCase().includes(searchTerm.get().toLowerCase())
//     );
// });
