import React from "react";
import { Link } from "react-router-dom";
import { getUserData } from "./Utils";

const Header = () => {
  const getHref = ((window?.location?.pathname === "/") ? undefined : "/");
  const isLoginPage = (window?.location?.pathname === "/login");

  return (
    <div className="header">
      <a href={getHref} className="logo">
        Tourm
        <i className="fas fa-pencil-alt" />
      </a>
      {!isLoginPage ?
        getUserData()?.username ?
          <div>
            <i className="fas fa-user"></i>
            <span>{getUserData()?.username}</span>
          </div> :
          <Link to="/login">Login</Link>
        : null
      }
    </div>
  )
};

export default Header;