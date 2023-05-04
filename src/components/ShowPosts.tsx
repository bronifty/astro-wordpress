import React from "react";
import { useStore } from "@nanostores/react";
import { searchTerm, Post, postsArray } from "../store/posts";
import PostCard from "./PostCard";

const filterPosts = (search: string, unfilteredPosts: Post[]) => {
  if (search === "") {
    return unfilteredPosts.filter((post) => post.title === "");
  }
  const searchTerm = search.toLowerCase();
  return unfilteredPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.description.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.author.toLowerCase().includes(searchTerm) ||
      post.category.toLowerCase().includes(searchTerm)
  );
};

const ShowPosts = () => {
  const search = useStore(searchTerm);
  const unfiltered = useStore(postsArray);
  const posts = filterPosts(search, unfiltered);
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
