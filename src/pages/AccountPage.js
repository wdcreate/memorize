import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "./styles/AccountPage.scss";

const Account = () => {
  const { user, logout, triggerResetEmail, verifyEmail, updateUsername } =
    UserAuth();
  const navigate = useNavigate();
  const [notify, setNotify] = useState("");
  const [color, setColor] = useState("");
  const [editNU, setEditNU] = useState(false);
  const [newUsername, setNewUsername] = useState(user.displayName);
  const changeUsername = () => {
    try {
      console.log(newUsername);
      if (newUsername.length >= 1) {
        updateUsername(newUsername);
        setEditNU(false)
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };
  const notificationStyle = { background: `${color}` };
  const ver = () => {
    setNotify("Please check email");
    setColor("green");
    verifyEmail();
  };
  const resetEmail = () => {
    setNotify("Please check email");
    setColor("green");
    triggerResetEmail();
  };
  useEffect(() => {
    if (!user.emailVerified) {
      setNotify("Please verify your account");
      setColor("red");
    }
  }, []);

  return (
    <div className="accountpage">
      {notify ? (
        <div className="notification" style={notificationStyle}>
          <span>{notify}</span>
        </div>
      ) : (
        ""
      )}
      <h1>Account</h1>
      <div className="account-settings">
        <span>Username:</span>
        <p> {(user && user.displayName)|| newUsername}</p>
      </div>
      <div className="account-settings">
        <span>Change username:</span>
        {editNU ? (
          <div className="editnu">
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <button type="button" onClick={() => changeUsername()}>
            <img src={require("../assets/left-arrow.svg").default} alt="save" />
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => setEditNU(true)}>
            Change
          </button>
        )}
      </div>
      <div className="account-settings">
        <span>User Email:</span>
        <p> {user && user.email}</p>
      </div>
      <div className="account-settings">
        <span>Reset Password:</span>
        <button type="button" onClick={resetEmail}>
          Set new
        </button>
      </div>
      <div className="account-settings">
        <span>Account Verification:</span>
        {!user.emailVerified ? (
          <button type="button" onClick={ver}>
            Verify
          </button>
        ) : (
          <button type="button" className="verified" disabled>
            Verified
          </button>
        )}
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Account;
