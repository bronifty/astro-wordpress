import React from "react";
import { searchTermTest } from "../store/posts";

const SearchPosts = () => {
  const handleChange = async (event) => {
    console.log("searchTermTest inside SearchPosts: ", searchTermTest);
    return searchTermTest.set(event.target.value);
  };

  return (
    <>
      <input type="text" placeholder="Search posts" onChange={handleChange} />
    </>
  );
};

export default SearchPosts;
