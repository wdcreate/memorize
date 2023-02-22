import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "./styles/LoginPage.scss"

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);
  const [error, setError] = useState("");
  const { createUser } = UserAuth();
  const { googleAuth } = UserAuth();
  const navigate = useNavigate();
  const validPass =
    password.length >= 6 &&
    confirmedPassword > 6 &&
    password === confirmedPassword;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (validPass) {
      try {
        await createUser(email, password);
        navigate("/account");
      } catch (e) {
        setError(e.message);
        console.log(e.message);
      }
    } else {
      setWrongPassword(true);
    }
  };

  return (
    <div className="auth-form login-form">
      <div>
        <h1>Sign up for a free account</h1>
        <p className="intro">
          Already have an account yet?{" "}
          <Link to="/" >
            Sign in.
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="place for email"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="place for password"
            type="password"
          />
        </div>
        <div>
          <label>
            {!wrongPassword ? (
              <span>Confirm Password</span>
            ) : (
              <span>Passwords dont match, try again</span>
            )}{" "}
          </label>
          <input
            onChange={(e) => setConfirmedPassword(e.target.value)}
            placeholder="place for confirm password"
            type="password"
          />
        </div>
        <button type="submit" className="main-btn">
          Sign Up
        </button>
      </form>

      <div className="google-btn" onClick={() => googleAuth()}>
        <div className="google-icon-wrapper">
          <img
            className="google-icon" alt="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          />
        </div>
        <p className="btn-text">
          <b>Sign up with Google</b>
        </p>
      </div>
    </div>
  );
};

export default Signup;
