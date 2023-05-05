import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";

// Fuse.js options
const options = {
  keys: ["title", "author"],
  threshold: 0.3,
};

const SearchComponent = () => {
  // State to store search query
  const [searchQuery, setSearchQuery] = useState("");
  // State to store search results
  const [searchResults, setSearchResults] = useState([]);
  // State to store data from API
  const [data, setData] = useState([]);
  // State to store Fuse.js instance
  const [fuse, setFuse] = useState(null);

  // Fetch data from API and initialize Fuse.js instance
  useEffect(() => {
    fetch("/slugs.json")
      .then((response) => response.json())
      .then((fetchedData) => {
        console.log("fetchedData", fetchedData);
        setData(fetchedData.posts);
        setFuse(new Fuse(fetchedData.posts, options));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Handle search query changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Perform search using Fuse.js
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }
    if (fuse) {
      const results = fuse.search(searchQuery);
      setSearchResults(results.map((res) => res.item));
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
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

export default SearchComponent;
