import React from "react";
import { useStore } from "@nanostores/react";
import { postsArray, addPosts } from "../store/posts";

const ShowPosts = () => {
  const postsStore = useStore(postsArray);
  // get posts with a fetch to the '/slugs.json' endpoing inside a useEffect
  // call postsStore.set() with the response from the fetch
  React.useEffect(() => {
    fetch("/slugs.json")
      .then((response) => response.json())
      .then((data) => addPosts(data));
  }, []);

  return (
    <>
      <h1>Show Posts</h1>
      {`<pre>${JSON.stringify(postsStore, null, 2)}</pre>`}
    </>
  );
};

export default ShowPosts;
