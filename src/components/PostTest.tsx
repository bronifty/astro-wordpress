// components/Post.tsx
import { useStore } from "@nanostores/react";
import { $allPosts } from "../store/posts";

const PostTest = () => {
  const { data, loading } = useStore($allPosts);
  if (loading) return <>Loading...</>;
  if (!data) return <>Error!</>;

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>
          <p>Title: {post.title}</p>
          <p>Slug: {post.slug}</p>
        </li>
      ))}
    </ul>
  );
};

export default PostTest;
