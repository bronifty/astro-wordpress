import React from "react";
import { postsArray, searchTerm } from "../store/posts";

const SearchPosts = () => {
  const fetcher = async () => {
    const res = await fetch("/slugs.json");
    const data = await res.json();
    return data.posts;
  };

  const handleChange = async (event) => {
    return searchTerm.set(event.target.value);
  };
  React.useEffect(() => {
    const loader = async () => {
      const fetchedPosts = await fetcher();
      postsArray.set(fetchedPosts);
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
