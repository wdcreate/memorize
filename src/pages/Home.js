import React, { Component } from "react";
import { Link} from "react-router-dom";

 
class Home extends Component {
  
  render() {
   const rnf=()=>{
       let rn = Math.floor(Math.random()*this.props.num)
       let hr = this.props.data[rn]
       console.log(hr.word)
       console.log(hr.translate)
       console.log(hr.note)
       return (
         <div className="saved-card hr-card">
           <p>{hr.word}</p>
         </div>       
       )};
    
    return (
      <div>
        <h2>Home</h2>
        <div className='home-inner'>
          {this.props.num>=1? <div className='home-stat'>
          <p>Saved words: <span>{this.props.num}</span></p>
          <div className="home-random">
            <p>Your today's random word:</p>
           {rnf()}
          </div>
          <Link className="home-btn main-btn" to="/saved">See all</Link>
        </div> : <div> You dont have any saved word.
        <Link className="main-btn" to="/addcard">Save your first word</Link>
          </div>}
        
          
        </div>
        
      </div>
    );
  }
}
 
export default Home;
/*

<div className="saved-card" key={rn}>
  <p>{sl.word}</p>
  <p>{sl.translate}</p>
  <p>{sl.note}</p>
</div>
*/