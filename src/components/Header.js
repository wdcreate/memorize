import { Link, useNavigate, useLocation } from "react-router-dom";

function Header(props) {
  let navigate = useNavigate();
  let location = useLocation();
  let sb = location.pathname.includes("/saved");
  let sBlock;
  let df;


  if (sb) {
    df = "header-inner df";
    sBlock = (
      <div>
      <Link className="search" to="/">
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
