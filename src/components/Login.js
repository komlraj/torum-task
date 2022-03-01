import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LOGIN_API } from "./Utils";
import Header from "./Header";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(LOGIN_API, { user: { email, password } })
      .then(({ data, error }) => {
        if (data?.user) {
          localStorage.setItem("user", JSON.stringify(data?.user));
          navigate("/");
        }
      }).catch(error => setErrorMessage("Something went wrong!"))
  }
  return (
    <>
      <Header />
      <div className="container mt-72">
        <form onSubmit={handleSubmit} className="login">
          <input
            name="email"
            type="email"
            placeholder="email"
            className="input"
            onChange={(e) => {
              setEmail(e?.target?.value);
              setErrorMessage("");
            }}
          />
          <input
            name="password"
            type="password"
            placeholder="password"
            className="input"
            onChange={(e) => {
              setPassword(e?.target?.value);
              setErrorMessage("")
            }}
          />
          {errorMessage?.length ? <label className="error-msg">{errorMessage}</label> : ""}
          <input
            type="submit"
            value="Login"
            onClick={handleSubmit}
            className="btn login-btn"
          />
        </form>
      </div>
    </>
  )
};

export default (Login);