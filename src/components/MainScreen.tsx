import React from 'react';
import {Link} from 'react-router-dom';
import ButtonRegBlock from "./ButtonRegBlock"
import "./styles/MainScreen.scss"

function MainScreen() {
  return <div className="mainscreen">
		<div className="mainscreen-img">
			<img src={require("../assets/mainscreen1.png")} alt="Main Screen" />
		</div>
		<div className="mainscreen-content">
				<h1>Explore and collect <br />your new words</h1>
					<Link className="about-link" to="/about">Read more about us</Link>
				<ButtonRegBlock/>
		</div>
	</div>;
}

export default MainScreen;
