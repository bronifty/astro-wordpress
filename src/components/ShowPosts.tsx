import React from "react";
import { useStore } from "@nanostores/react";
import { searchTerm, filterPosts } from "../store/posts";
import PostCard from "./PostCard";

const ShowPosts = () => {
  const search = useStore(searchTerm);
  const posts = filterPosts(search);
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
