import React from "react";
import { formatDate, slugify } from "../js/utils";

const PostCard = ({ title, author, category, date, description, slug }) => {
  return (
    <article className="card">
      <small>
        <a href={`/category/${slugify(category)}/`} className="badge">
          {category}
        </a>
      </small>
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
        <a href={slug}>
          <span>Read Post</span>
        </a>
      </div>
    </article>
  );
};

export default PostCard;
