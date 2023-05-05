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
export const searchTermTest = atom<string>("");
export const atomQuery = atom<string>("");

// load the postsArray when we are on the client
// canonical astro code is: if (!import.meta.env.SSR) { ... }
if (typeof window !== "undefined") {
  // if (!import.meta.env.SSR) {
  (async () => {
    const res = await fetch("/slugs.json");
    const data = await res.json();
    return postsArray.set(data.posts);
  })();
}

const localPostsArray = [
  {
    title: "Post 1",
    author: "Brother Nifty",
    category: "life",
    date: "2023-04-21T00:00:00.000Z",
    description: "This is the first post",
    content:
      "\n## Heading 1\n\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Totam pariatur reprehenderit rerum nulla est eius similique adipisci dolor dolores. Quo in nisi facere error corporis dolorum, nesciunt dolor dicta! Esse!\n\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Totam pariatur reprehenderit rerum nulla est eius similique adipisci dolor dolores. Quo in nisi facere error corporis dolorum, nesciunt dolor dicta! Esse!\n\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Totam pariatur reprehenderit rerum nulla est eius similique adipisci dolor dolores. Quo in nisi facere error corporis dolorum, nesciunt dolor dicta! Esse!\n",
    slug: "/blog/post-1",
  },
];

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
