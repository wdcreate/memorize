import React from "react";
import { UserAuth } from "../context/AuthContext";
import "./styles/GoogleButton.scss";

type gbType = {
  sizeSmall?: boolean | undefined;
};

const GoogleButton = ({ sizeSmall }: gbType) => {
  const { googleAuth } = UserAuth();

  return (
    <div>
      {sizeSmall ? (
        <div className="google-btn-spec" onClick={() => googleAuth()}>
          <div className="google-icon-spec">
            <img
              className="google-icon"
              alt="logo"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            />
          </div>
        </div>
      ) : (
        <div className="google-btn" onClick={() => googleAuth()}>
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              alt="logo"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            />
          </div>
          <p className="btn-text">
            <b>Continue with Google</b>
          </p>
        </div>
      )}
    </div>
  );
};
export default GoogleButton;
