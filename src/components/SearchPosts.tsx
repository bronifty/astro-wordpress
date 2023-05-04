import React from "react";
import { searchTerm } from "../store/posts";

const SearchPosts = () => {
  const handleChange = async (event) => {
    return searchTerm.set(event.target.value);
  };

  return (
    <>
      <input type="text" placeholder="Search posts" onChange={handleChange} />
    </>
  );
};

export default SearchPosts;
