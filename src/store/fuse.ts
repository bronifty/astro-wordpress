// store/posts.ts
import { atom, computed } from "nanostores";
import Fuse from "fuse.js";

// Fuse.js options
const options = {
  keys: ["title", "author", "category", "content", "description"],
  threshold: 0.3,
};

export interface Post {
  title: string;
  author: string;
  category: string;
  date: string;
  description: string;
  content: string;
  slug: string;
}

// using in other components
export const searchTermTest = atom<string>("");
export const postsArray = atom<Post[]>([]);

// using in fuse component
export const atomQuery = atom<string>("");
export const atomFuse = atom<Object>({});

// load the postsArray when we are on the client
// canonical astro code is: if (!import.meta.env.SSR) { ... }
// if (typeof window !== "undefined") {
let fuse;
if (!import.meta.env.SSR) {
  (async () => {
    const res = await fetch("/slugs.json");
    const data = await res.json();
    atomFuse.set(new Fuse(data.posts, options));
    return postsArray.set(data.posts);
  })();
}

// filter the postsArray
// export const filterPosts = (posts: Post[], searchTerm: string) => {
//   if (searchTerm === "") {
//     return posts.filter((post) => post.title === "");
//   }
//   return posts.filter((post) => {
//     const titleMatch = post.title
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const contentMatch = post.content
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const authorMatch = post.author
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const categoryMatch = post.category
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const descriptionMatch = post.description
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     return (
//       titleMatch ||
//       contentMatch ||
//       authorMatch ||
//       categoryMatch ||
//       descriptionMatch
//     );
//   });
// };

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
