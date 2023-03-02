import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "./styles/Header.scss";

function Header() {
  let navigate = useNavigate();
  let location = useLocation();
  let logpage = location.pathname.includes("/login");
  let regpage = location.pathname.includes("/signup");
  const { user, noUser } = UserAuth();

  const navNU = () => {
    if (logpage) {
      return (
        <Link className="header-nu-link" to="/signup">
          Sign Up
        </Link>
      );
    } else if (regpage) {
      return (
        <Link className="header-nu-link" to="/login">
          Log In
        </Link>
      );
    }
  };
  return (
    <header className="header">
      {!noUser ? (
        <div className="header-inner">
          <button
            className="back-btn"
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            <img src="./assets/left-arrow.svg" alt="Back" />
          </button>
          <Link className="logo" to="/">
            <img src="./logo.png" alt="Englio" />
          </Link>
          <div>
        {!user ? (
          <div className="header-links">
            <Link to="/login">log in</Link>
            <Link to="/signup">sign up</Link>
          </div>
        ) : (
          <Link className="account-link" to="/account">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "30", height: "30", fill: "#000" }}
              viewBox="0 0 24 24"
            >
              <g id="SVGRepo_bgCarrier" style={{ strokeWidth: "0" }}></g>
              <g
                style={{ strokeLinecap: "round", strokeLinejoin: "round" }}
              ></g>
              <g>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path>
              </g>
            </svg>
            {!user.emailVerified ? (
              <div className="vernotify">
                <img src="./assets/alert.svg" alt="alert" />
              </div>
            ) : (
              <span></span>
            )}
          </Link>
        )}
      </div>        </div>
      ) : (
        <div className="header-inner header-nu">
          <img src="./logo.png" className="logo-nu" alt="Englio" />
          {navNU()}
        </div>
      )}
    </header>
  );
}
export default Header;
