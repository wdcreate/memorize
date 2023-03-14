import GoogleButton from "./GoogleButton";
import { Link } from "react-router-dom";
import "./styles/ButtonRegBlock.scss";

function ButtonRegBlock() {
  const sizeSmall = true;
  return (
    <div className="brb-content">
      <div className="btn-block">
        <GoogleButton sizeSmall={sizeSmall} />
        <Link to="/signup">
          <img src="./assets/mail.svg" alt="" />
        </Link>
      </div>
      <div className="btm">
        <p>Have an account?</p>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

export default ButtonRegBlock;
