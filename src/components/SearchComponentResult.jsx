import React from "react";
import { useStore } from "@nanostores/react";
import { atomQueryResult } from "../store/fuse";
import PostCard from "./PostCard";

const SearchComponentResult = () => {
  const atomQueryResultStore = useStore(atomQueryResult);

  return (
    <div>
      <div>
        {atomQueryResultStore.length === 0 ? (
          <>
            <ul></ul>
          </>
        ) : (
          <>
            <ul>
              {atomQueryResultStore.map((post, idx) => (
                <li key={idx}>
                  <PostCard
                    title={post.title}
                    author={post.author}
                    category={post.category}
                    date={post.date}
                    description={post.description}
                    slug={post.slug}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchComponentResult;
