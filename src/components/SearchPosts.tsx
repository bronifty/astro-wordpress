import React from "react";
import { useStore } from "@nanostores/react";
import { postsArray, setPosts, filterPosts } from "../store/posts";

const SearchPosts = () => {
  const postsStore = useStore(postsArray);
  // get posts with a fetch to the '/slugs.json' endpoing inside a useEffect
  // call postsStore.set() with the response from the fetch
  React.useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("/slugs.json");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetcher();
  }, []);

  return (
    <>
      <input
        type="text"
        id="searchTerm"
        placeholder="Search posts"
        onChange={(e) => filterPosts(e.target.value)}
      />
    </>
  );
};

export default SearchPosts;
