import { Link, useNavigate, useLocation } from "react-router-dom";
//import AuthForm from '../pages/AuthForm'
function Header(props) {
  let navigate = useNavigate();
  let location = useLocation();
  let sb = location.pathname.includes("/saved"  );
  let ss = location.pathname.includes("/search" );
  let sBlock;
  let df;


  if (sb || ss) {
    df = "header-inner df";
    sBlock = (
      <div>
      <Link className="search" to="/search">
      <img src="./assets/search.svg" alt="Search" />
      </Link>
      </div>
    );
  } else {
    df = "header-inner";
  }
  return (
    <header className="header">
      <div className={df}>
        <button
          className="back-btn"
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
      <Link to="/login">
        log in
      </Link>
      <Link to="/signup">
        sign up
      </Link>
      </div>
    </header>
  );
}
export default Header;
