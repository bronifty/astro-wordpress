import React from "react";
import { useStore } from "@nanostores/react";
import { Post, postsArray, searchTerm, filteredPosts } from "../store/posts";

const SearchPosts = () => {
  const postsStore = useStore(postsArray);
  const setPosts = (posts: Post[]) => postsArray.set(posts);
  const fetcher = async () => {
    const res = await fetch("/slugs.json");
    const data = await res.json();
    return data.posts;
  };

  const handleChange = async (event) => {
    return searchTerm.set(event.target.value);
  };

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
      <input type="text" placeholder="Search posts" onChange={handleChange} />
    </>
  );
};

export default SearchPosts;
