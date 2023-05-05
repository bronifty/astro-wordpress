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
    const results = atomFuse.get().search(atomQuery.get());
    // const results = atomFuse.get().search(e.target.value);
    atomQueryResult.set(results.map((res) => res.item));
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
    <>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={atomQueryStore}
          onChange={handleAtomQueryChange}
          placeholder="Search..."
        />
        <button type="submit" hidden></button>
      </form>
    </>
  );
};

export default SearchComponentForm;
