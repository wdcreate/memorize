import { UserAuth } from "../context/AuthContext";

const GoogleButton =()=>{
    const { googleAuth } = UserAuth();

return (
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
)
}
export default GoogleButton;