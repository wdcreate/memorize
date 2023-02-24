import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "./styles/Header.scss";

function Header() {
  let navigate = useNavigate();
  let location = useLocation();
  let sb = location.pathname.includes("/saved");
  let ss = location.pathname.includes("/search");
  let logpage = location.pathname.includes("/login");
  let regpage = location.pathname.includes("/signup");
  let sBlock;
  const { user, noUser } = UserAuth();

  if (sb || ss) {
    sBlock = (
      <div>
        <Link className="search" to="/search">
          <svg
            viewBox="0 0 24 24"
            style={{ width: "30", height: "30", fill: "none" }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <g style={{ strokeWidth: "0" }}></g>
            <g style={{ strokeLinecap: "round", strokeLinejoin: "round" }}></g>
            <g>
              {" "}
              <rect style={{ fill: "white" }}></rect>{" "}
              <path
                style={{
                  fillRule: "evenodd",
                  cliRule: "evenodd",
                  fill: "#000",
                }}
                d="M7.25007 2.38782C8.54878 2.0992 10.1243 2 12 2C13.8757 2 15.4512 2.0992 16.7499 2.38782C18.06 2.67897 19.1488 3.176 19.9864 4.01358C20.824 4.85116 21.321 5.94002 21.6122 7.25007C21.9008 8.54878 22 10.1243 22 12C22 13.8757 21.9008 15.4512 21.6122 16.7499C21.321 18.06 20.824 19.1488 19.9864 19.9864C19.1488 20.824 18.06 21.321 16.7499 21.6122C15.4512 21.9008 13.8757 22 12 22C10.1243 22 8.54878 21.9008 7.25007 21.6122C5.94002 21.321 4.85116 20.824 4.01358 19.9864C3.176 19.1488 2.67897 18.06 2.38782 16.7499C2.0992 15.4512 2 13.8757 2 12C2 10.1243 2.0992 8.54878 2.38782 7.25007C2.67897 5.94002 3.176 4.85116 4.01358 4.01358C4.85116 3.176 5.94002 2.67897 7.25007 2.38782ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z"
              ></path>{" "}
            </g>
          </svg>
        </Link>
      </div>
    );
  } else {
    sBlock = (
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
      </div>
    );
  }
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
          {sBlock}
        </div>
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
