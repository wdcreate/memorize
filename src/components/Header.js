import { Link, useNavigate, useLocation } from "react-router-dom";

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
        Search
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
          Back
        </button>
        <Link className="logo" to="/">
          Englio
        </Link>
        {sBlock}
      </div>
    </header>
  );
}

export default Header;
