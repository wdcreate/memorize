import { UserAuth } from "../context/AuthContext";
import "./styles/GoogleButton.scss"


const GoogleButton = ({sizeSmall}) => {
  const { googleAuth } = UserAuth();

  return (
    <div>
      <div className={sizeSmall ? "google-btn-spec" : "google-btn"} onClick={() => googleAuth()}>
        <div className={sizeSmall ? "google-icon-spec" : "google-icon-wrapper"}>
          <img
            className="google-icon"
            alt="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          />
        </div>
        {!sizeSmall && <p className="btn-text">
          <b>Continue with Google</b>
        </p>}
      </div>
    </div>
  );
};
export default GoogleButton;
