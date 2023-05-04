import React from "react";
import { useStore } from "@nanostores/react";
import { Post, postsArray, searchTermTest } from "../store/posts";
import PostCard from "./PostCard";

import Fuse from "fuse.js";

export const filterPosts = (posts: Post[], searchTerm: string) => {
  const fuse = new Fuse(posts, {
    keys: ["title", "author", "category", "description", "content"],
    includeScore: true,
    shouldSort: true,
    includeMatches: true,
    minMatchCharLength: 1,
    threshold: 0.3,
  });
  const searchResults = fuse.search(searchTerm);
  return searchResults;
};

const ShowPosts = () => {
  // console.log("searchTermTest: ", searchTermTest);
  // import loaded postsArray and make it reactive inside the component
  const postsStore = useStore(postsArray);
  // import searchTerm and make it reactive inside the component
  // whenever searchTerm changes, the component will re-render
  const searchTermStore = useStore(searchTermTest);
  // console.log("searchTermStore: ", searchTermStore);
  // when the component re-renders, the value of posts will be reset to the return value of filterPosts, which is loaded with the postsArray (retrieved from the slugs.json file) and filtered by the current value of searchTerm; if searchTerm is empty, we make sure to not return any posts;
  const posts = filterPosts(postsStore, searchTermStore);
  // console.log("inside ShowPosts: ", posts);
  return (
    <>
      {posts.length > 0 && (
        <div>
          <h1>Filtered Posts</h1>
          <ul>
            {posts.map((post, idx) => (
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
        </div>
      )}
    </>
  );
};

export default ShowPosts;
