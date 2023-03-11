import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  GoogleButton from '../components/GoogleButton';
import { UserAuth } from "../context/AuthContext";
import "./styles/LoginPage.scss";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);
  const [error, setError] = useState("");
  const { createUser } = UserAuth();
  const { setNoUser } = UserAuth();
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
        setNoUser(false);
      } catch (e) {
        setError(e.message);
      }
    } else {
      setWrongPassword(true);
    }
  };

  return (
    <div className="auth-form login-form">
      <div>
        <h1>Create Account</h1>
      </div>
      <GoogleButton />
         <div className="or-block">
        OR
        </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="place for email"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="place for password"
            type="password"
            required
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
            required
          />
        </div>
        {error ? <div className="error-notification">Account with this email already exist</div> : ""}        
        <button type="submit" className="login-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
