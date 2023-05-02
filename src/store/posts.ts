// store/posts.ts
import { atom, computed } from "nanostores";

export interface Post {
  title: string;
  description: string;
  content: string;
  slug: string;
}

export const postsArray = atom<Post[]>([]);
export const searchTerm = atom<string>("");

export const filteredPosts = computed(searchTerm, (search) =>
  postsArray
    .get()
    .filter((post) =>
      post.title.toLowerCase().includes(searchTerm.get().toLowerCase())
    )
);

// sequence:
// 1 fill postsArray with posts
// 2 filter postsArray with searchTerm

// export const addPost = (post: Post) =>
//   postsArray.set((posts) => [...posts, post]);
export const addPosts = (posts: Post[]) => postsArray.set(posts);
export const setPosts = (posts: Post[]) => postsArray.set(posts);
// filterPosts which takes a string and returns a filtered array of posts
export const filterPosts = (searchTerm: string) => {
  // const tempPostsArray = postsArray.get();
  const filteredPostsArray = postsArray.get().filter((post) => {
    return post.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  return setPosts(filteredPostsArray);
};
