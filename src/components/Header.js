import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
//import { useEffect } from "react";


function Header(props) {
  //const user = auth.currentUser;
  let navigate = useNavigate();
  let location = useLocation();
  let sb = location.pathname.includes("/saved"  );
  let ss = location.pathname.includes("/search" );
  let sBlock;
  let df;
  const {user} = UserAuth()



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
       {!user ? 
       <div className='header-links'><Link to="/login">
        log in
      </Link>
      
      <Link to="/signup">
        sign up
      </Link></div> : <Link className='account-link' to="/account">
        Account
      </Link>}
      
      </div>
    </header>
  );
}
export default Header;
