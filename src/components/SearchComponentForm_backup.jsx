import React, { useState } from "react";
import Fuse from "fuse.js";
import { useStore } from "@nanostores/react";
import { atomFuse, atomQuery, atomQueryResult } from "../store/fuse";

// Fuse.js options
const options = {
  keys: ["title", "author", "category", "content", "description"],
  threshold: 0.3,
};

const SearchComponentForm = () => {
  const atomQueryStore = useStore(atomQuery);

  const handleAtomQueryChange = (e) => {
    atomQuery.set(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (atomQueryStore.trim() === "") {
      atomQueryResult.set([]);
      return;
    }
    const results = atomFuse.get().search(atomQueryStore);
    atomQueryResult.set(results.map((res) => res.item));
    console.log(atomQueryResult.get());
    return;
  };

  return (
    <div>
      <h1>SearchComponentForm</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={atomQueryStore}
          onChange={handleAtomQueryChange}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchComponentForm;
