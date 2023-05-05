// import { atom } from "nanostores";

// export const counter = atom(0);
// export const increment = (count) => counter.set(count + 1);

// // store/users.ts
import { atom } from "nanostores";
interface Post {
  title: string;
  description: string;
  content: string;
  slug: string;
}

export const posts = atom<Post[]>([]);
// export const users = atom<Post[]>([]);

export function addPost(post: Post) {
  posts.set([...posts.get(), post]);
}
export function getPosts() {
  // posts.set([...posts.get(), post]);
  fetchData();
}
// export function addUser(user: User) {
//   users.set([...users.get(), user]);
// }

let data = [];
const fetchData = async () => {
  try {
    const response = await fetch("/slugs.json");
    const jsonData = await response.json();
    data = jsonData.posts; // Assuming the fetched data contains a "posts" property
    posts.set(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
