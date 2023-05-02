import React from "react";
import { useStore } from "@nanostores/react";
import { Post, postsArray, searchTerm, filteredPosts } from "../store/posts";

const SearchPosts = () => {
  const postsStore = useStore(postsArray);
  const searchTermStore = useStore(searchTerm);
  const setPosts = (posts: Post[]) => postsArray.set(posts);
  const fetcher = async () => {
    const res = await fetch("/slugs.json");
    const data = await res.json();
    return data.posts;
  };

  // const handleChange = async (event) => {
  //   searchTermStore.set(event.target.value);
  //   if (searchTerm.trim() === "") {
  //     // If the search box is empty, clear the posts
  //     setPosts([]);
  //   } else {
  //     // Otherwise, load all posts and filter with search term perform the search
  //     const posts = await fetcher();
  //     console.log("posts from fetcher in SearchPosts.tsx:", posts);
  //     const filteredPosts = posts.filter((post) =>
  //       post.title.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //     setPosts(filteredPosts);
  //   }
  // };

  // const filterPosts = (searchTerm: string) => {
  //   // const tempPostsArray = postsArray.get();
  //   const filteredPostsArray = postsArray.get().filter((post) => {
  //     return post.title.toLowerCase().includes(searchTerm.toLowerCase());
  //   });
  //   return setPosts(filteredPostsArray);
  // };
  // get posts with a fetch to the '/slugs.json' endpoing inside a useEffect
  // call postsStore.set() with the response from the fetch
  React.useEffect(() => {
    const loader = async () => {
      const fetchedPosts = await fetcher();
      postsArray.set(fetchedPosts);
      // setPosts(fetchedPosts);
    };
    loader();
  }, []);

  return (
    <>
      {/* <input type="text" placeholder="Search posts" onChange={handleChange} /> */}
    </>
  );
};

export default SearchPosts;
