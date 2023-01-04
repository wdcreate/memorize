import React, { Component } from "react";
import { Link} from "react-router-dom";

 
class Home extends Component {
  render() {
    return (
      <div>
        <h2>Home</h2>
        <div className='home-inner'>
        <div className='home-stat'>
          <p>Saved words: <span>13</span></p>
          <div className="home-random">
            <p>Your today's random word:</p>
            <p>Hello</p>
          </div>
          <Link className="home-btn" to="/saved">See all</Link>

        </div>
          
        </div>
        
      </div>
    );
  }
}
 
export default Home;