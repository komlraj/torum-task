import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatDate, API_BASE_URL, getUserData } from "./Utils";
import CommentCard from "./CommentCard";
import Header from "./Header";

const SinglePost = () => {

  // Initialize state
  const params = useParams();
  const [postData, setPostData] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const slug = params?.slug;
  const apiHeaders = { "Authorization": `Bearer ${getUserData()?.token}` };

  // Fetch post
  useEffect(() => {
    const postUrl = API_BASE_URL + "/" + slug;
    axios
      .get(postUrl)
      .then(function ({ data }) {
        if (data?.article) setPostData(data?.article);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  // Fetch comments
  useEffect(() => {
    const commentsUrl = `${API_BASE_URL}/${slug}/comments`;
    axios
      .get(commentsUrl)
      .then(function ({ data }) {
        if (data?.comments) setComments(data?.comments);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleComment = e => {
    e.preventDefault();
    const commentsUrl = `${API_BASE_URL}/${slug}/comments`;
    axios
      .post(commentsUrl, { comment: { body: commentText } }, { headers: apiHeaders })
      .then(({ data }) => {
        if (data?.comment?.id) {
          setComments([...comments, data?.comment]);
          setCommentText("");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleDelComment = id => {
    const delCommentUrl = `${API_BASE_URL}/${slug}/comments/${id}`;
    axios
      .delete(delCommentUrl, { headers: apiHeaders })
      .then(({ data }) => {
        if (data?.comments) setComments(data?.comments);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Header />
      {isLoading ? <div className="loading">Loading...</div> :
        <div className="container mt-72">
          <div className="post-card-header">
            <img src={postData?.author?.image} alt={postData?.author?.username} className="author-img" />
            <span className="author-name">{postData?.author?.username}</span>
            <span className="date">{formatDate(postData?.createdAt)}</span>
          </div>
          {postData && (
            <div className="post">
              <h1 className="title">{postData.title}</h1>
              <h2 className="desc">{postData.description}</h2>
              <p className="body">{postData.body}</p>
            </div>
          )}

          <div className="comment-container">
            {getUserData()?.token ?
              <form onSubmit={handleComment} className="comment-form">
                <div className="comment-box">
                  <input
                    type="text"
                    name="comment"
                    value={commentText}
                    placeholder="write Comment"
                    onChange={(e) => setCommentText(e?.target?.value)}
                    className="input"
                  />
                  <input
                    type="submit"
                    value="Comment"
                    className="btn comment-btn"
                    onClick={handleComment}
                  />
                </div>
              </form> :
              <div className="login-msg-info">
                <Link to="/login">Login</Link>
                <span>to add your comments on this post.</span>
              </div>
            }
            <div>
              {comments &&
                comments?.map((comment) => {
                  return <CommentCard
                    key={comment?.id}
                    comment={comment}
                    handleDelComment={handleDelComment}
                    formatDate={formatDate}
                  />
                })}
            </div>
          </div>
        </div>
      }
    </>
  )
};

export default (SinglePost);