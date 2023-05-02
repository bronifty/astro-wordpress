import React from "react";
import { Image } from "@astrojs/image/components";
import { formatBlogPosts, formatDate, slugify } from "../js/utils";

const PostCard = ({ title, author, date, description, slug }) => {
  return (
    <article className="card">
      <div className="content">
        <div>
          <h3 className="h3">
            <a href={slug}>{title}</a>
          </h3>
          <small>
            by <a href={`/author/${slugify(author)}/`}>{author}</a> •{" "}
            {formatDate(date)}
          </small>
        </div>
        <p>{description}</p>
        <a href={`/blog/${slug}/`}>
          <span>Read Post</span>
        </a>
      </div>
    </article>
  );
};

export default PostCard;
