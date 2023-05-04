import React, { useState } from "react";
import Fuse from "fuse.js";

const SearchComponent = () => {
  const [stateData, setStateData] = useState([]);
  // Sample data set
  // const data = [
  //   { title: "The Alchemist", author: "Paulo Coelho" },
  //   { title: "The Catcher in the Rye", author: "J.D. Salinger" },
  //   { title: "To Kill a Mockingbird", author: "Harper Lee" },
  //   // Add more data here...
  // ];
  let fuse;
  // Fuse.js options
  const options = {
    keys: ["title", "author"],
    threshold: 0.3,
  };
  const getSlugs = async () => {
    const response = await fetch("/slugs.json");
    const data = await response.json();
    console.log(data.posts);
    fuse = new Fuse(data.posts, options);
  };

  React.useEffect(() => {
    const fuse = new Fuse(stateData, options);
    getSlugs();
  }, []);

  // Initialize Fuse.js instance

  // State to store search query
  const [searchQuery, setSearchQuery] = useState("");
  // State to store search results
  const [searchResults, setSearchResults] = useState([]);

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
    const results = fuse.search(searchQuery);
    setSearchResults(results.map((res) => res.item));
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
