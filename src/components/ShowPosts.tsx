import React from "react";
import { useStore } from "@nanostores/react";
import { postsArray, addPosts } from "../store/posts";

const ShowPosts = () => {
  const postsStore = useStore(postsArray);
  return (
    <>
      <h1>Show Posts</h1>
      {/* {`<pre>${JSON.stringify(postsStore, null, 2)}</pre>`} */}
      <ul>
        {postsStore.length > 0 &&
          postsStore.map((post, idx) => (
            <a href={post.slug} key={idx}>
              {post.title}
            </a>
          ))}
      </ul>
    </>
  );
};

export default ShowPosts;
