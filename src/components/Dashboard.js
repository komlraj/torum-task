import React from "react";
import { useAPI } from "../contexts";
import PostCard from "./PostCard";
import Header from "./Header";

const Dashboard = () => {
  const apiData = useAPI();

  return (
    <>
      <Header />
      <div className="container">
        {
          apiData?.isLoading ? <div className="loading">Loading...</div> :
            <div>
              {
                apiData?.posts?.length ? <div className="post-list">
                  {apiData?.posts?.map(post => <PostCard key={post?.slug} post={post} />)}
                </div> :
                  <div className="no-post-msg">
                    <span>Uh-Oh! </span>
                    <p>No post available</p>
                  </div>
              }
            </div>
        }
      </div>
    </>
  )
};

export default Dashboard;