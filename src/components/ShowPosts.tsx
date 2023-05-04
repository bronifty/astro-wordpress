import React from "react";
import { useStore } from "@nanostores/react";
import { Post, postsArray, searchTerm, filterPosts } from "../store/posts";
import PostCard from "./PostCard";

const ShowPosts = () => {
  // import loaded postsArray and make it reactive inside the component
  const postsStore = useStore(postsArray);
  // import searchTerm and make it reactive inside the component
  // whenever searchTerm changes, the component will re-render
  const searchTermStore = useStore(searchTerm);
  // when the component re-renders, the value of posts will be reset to the return value of filterPosts, which is loaded with the postsArray (retrieved from the slugs.json file) and filtered by the current value of searchTerm; if searchTerm is empty, we make sure to not return any posts;
  const posts = filterPosts(postsStore, searchTermStore);
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
