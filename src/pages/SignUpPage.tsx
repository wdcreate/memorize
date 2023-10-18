import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import  GoogleButton from '../components/GoogleButton';
import { UserAuth } from "../context/AuthContext";
import "./styles/LoginPage.scss";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string | null>("");
  const [confirmedPassword, setConfirmedPassword] = useState<string>("");
  const [wrongPassword, setWrongPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { createUser } = UserAuth();
  const { setNoUser } = UserAuth();
  const navigate = useNavigate();

  const validPass = password.length >= 6 && confirmedPassword.length > 6 && password === confirmedPassword;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError("");
    if (validPass) {
      try {
        await createUser(email, password, username);
        navigate("/account");
        setNoUser(false);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
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
          <label>Username</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="place for username"
            required
          />
        </div>
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
            autoComplete="off"
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
            autoComplete="off"
          />
        </div>
        {error ? <div className="error-notification">{error}</div> : ""}        
        <button type="submit" className="login-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
