import React, { useState } from "react";
import Fuse from "fuse.js";
import { useStore } from "@nanostores/react";
import { atomQuery, atomFuse } from "../store/fuse";

// Fuse.js options
const options = {
  keys: ["title", "author", "category", "content", "description"],
  threshold: 0.3,
};

const SearchComponent3 = () => {
  // state to store data from API
  // state to store Fuse.js instance
  // const [fuse, setFuse] = useState(null);
  // state to store search query
  // const [searchQuery, setSearchQuery] = useState("");
  const atomQueryStore = useStore(atomQuery);
  // state to store search results
  const [searchResults, setSearchResults] = useState([]);

  // const getSlugs = async () => {
  //   const response = await fetch("/slugs.json");
  //   const data = await response.json();
  //   console.log(data.posts);
  //   setFuse(new Fuse(data.posts, options));
  // };

  // React.useEffect(() => {
  //   getSlugs();
  // }, []);

  // Handle search query changes
  const handleSearchChange = (e) => {
    atomQuery.set(e.target.value);
  };

  // Perform search using Fuse.js
  const handleSearch = (e) => {
    e.preventDefault();
    if (atomQueryStore.trim() === "") {
      setSearchResults([]);
      return;
    }
    const results = atomFuse.get().search(atomQueryStore);
    setSearchResults(results.map((res) => res.item));
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={atomQueryStore}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {searchResults.length === 0 ? (
          <p>No results found</p>
        ) : (
          <ul>
            {searchResults.map((item, index) => (
              <li key={index}>
                {item.title} by {item.author}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchComponent3;
