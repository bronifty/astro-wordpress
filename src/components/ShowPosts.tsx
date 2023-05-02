import React from "react";
import { useStore } from "@nanostores/react";
import { postsArray, filteredPosts } from "../store/posts";

const ShowPosts = () => {
  const postsStore = useStore(postsArray);
  const filteredPostsStore = useStore(filteredPosts);
  return (
    <>
      <h1>Posts</h1>
      <ul>
        {postsStore.length > 0 &&
          postsStore.map((post, idx) => (
            <a href={post.slug} key={idx}>
              {post.title}
            </a>
          ))}
      </ul>
      <h1>Filtered Posts</h1>
      <ul>
        {filteredPostsStore.length > 0 &&
          filteredPostsStore.map((post, idx) => (
            <a href={post.slug} key={idx}>
              {post.title}
            </a>
          ))}
      </ul>
    </>
  );
};

export default ShowPosts;
