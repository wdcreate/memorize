import GoogleButton from './GoogleButton';
import {Link} from 'react-router-dom';
import "./styles/MainScreen.scss"

function MainScreen() {
	const sizeSmall = true
  return <div className="mainscreen">
		<div className="mainscreen-img">
			<img src="./assets/mainscreen1.png" alt="Main Screen" />
		</div>
		<div className="mainscreen-content">
				<h1>Explore and collect <br />your new words</h1>
				<div className="btn-block">
					<p>Collect now <img src="./assets/left-arrow.svg" alt="" /></p>
					<GoogleButton sizeSmall={sizeSmall}/>
					<Link to="/signup"><img src="./assets/mail.svg" alt="" /></Link>
				</div>
				<div className="btm"><p>Have an account?</p><Link to="/login">Login</Link></div>
		</div>
	</div>;
}

export default MainScreen;
