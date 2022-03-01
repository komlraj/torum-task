import React from "react";
import { getUserData } from "./Utils";

const CommentCard = ({ comment, handleDelComment, formatDate }) => {

  return (
    <div className="comment-card">
      <div className="comment">
        <span >{comment?.body}</span>
      </div>
      <div className="card-footer">
        <div className="post-card-header">
          <img src={comment?.author?.image} alt={comment?.author?.username} className="author-img" />
          <span className="author-name">{comment?.author?.username}</span>
          <span className="date">{formatDate(comment?.createdAt)}</span>
        </div>
        {(comment?.author?.username === getUserData()?.username) ? <span
          onClick={() => handleDelComment(comment?.id)}
          className="footer"
        >
          <i className="fas fa-trash"></i>
        </span> : null}
      </div>
    </div>
  );
};

export default CommentCard;
