import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "./Utils";

const PostCard = ({ post = {} }) => {

  return (
    <Link className="post-card" to={`/post/${post?.slug}`}>
      <div className="post-card-header">
        <img src={post?.author?.image} alt={post?.slug} className="author-img" />
        <span className="author-name">{post?.author?.username}</span>
        <span className="date">{formatDate(post?.createdAt)}</span>
      </div>
      <h4 className="title">{post?.title}</h4>
      <p className="desc">{post?.description}</p>
      <div className="post-card-footer">
        <div>
          {post?.tagList?.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
        <div className="fav-count">
          <i className="fas fa-heart"></i>
          <span>{post?.favoritesCount}</span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
