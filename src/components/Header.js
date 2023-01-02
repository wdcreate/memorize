import { Link, useNavigate } from "react-router-dom";

function Header() {
    let navigate = useNavigate();
  return (
    <div className='header-inner'>
      <button className="back-btn" onClick={()=>{navigate(-1);}}>
        Back
      </button>
      <Link className="logo" to="/">Logo</Link>
    </div>
  );
}

export default Header;
