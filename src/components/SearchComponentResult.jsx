import React from "react";
import { useStore } from "@nanostores/react";
import { atomQueryResult } from "../store/fuse";

const SearchComponentResult = () => {
  const atomQueryResultStore = useStore(atomQueryResult);

  return (
    <div>
      <h1>SearchComponentResult</h1>
      <div>
        {atomQueryResultStore.length === 0 ? (
          <p>No results found</p>
        ) : (
          <ul>
            {atomQueryResultStore.map((item, index) => (
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

export default SearchComponentResult;
