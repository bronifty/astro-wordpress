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
export const setPosts = (posts: Post[]) => postsArray.set(posts);
// filterPosts which takes a string and returns a filtered array of posts
export const filterPosts = (searchTerm: string) => {
  const tempPostsArray = postsArray.get();
  const filteredPostsArray = tempPostsArray.filter((post) => {
    return post.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return setPosts(filteredPostsArray);
};
