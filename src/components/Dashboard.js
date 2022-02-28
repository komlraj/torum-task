import React from "react";
import { useAPI } from "../contexts";
import PostCard from "./PostCard";

const Dashboard = () => {
  const apiData = useAPI();

  return (
    <div className="container">
      {
        apiData?.isLoading ? <div className="loading">Loading...</div> :
          <div>
            {
              apiData?.posts?.length ? <div className="post-list">
                {apiData?.posts?.map(post => <PostCard post={post} />)}
              </div> :
                <div className="no-post-msg">
                  <span>Uh-Oh! </span>
                  <p>No post available</p>
                </div>
            }
          </div>
      }
    </div>
  )
};

export default Dashboard;