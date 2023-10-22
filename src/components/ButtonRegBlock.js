import GoogleButton from "./GoogleButton";
import { Link } from "react-router-dom";
import "./styles/ButtonRegBlock.scss";

function ButtonRegBlock() {
  return (
    <div className="brb-content">
      <div className="btn-block">
        <GoogleButton sizeSmall={true} />
        <Link to="/signup">
          <img src={require("../assets/mail.svg").default} alt="" />
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
