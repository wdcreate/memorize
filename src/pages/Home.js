import React, {useState} from "react";
import { Link } from "react-router-dom";

function Home({ data, num }) {
  let rn = Math.floor(Math.random() * num);
  const [randomNum, setRandomNum] = useState(rn);
  const clickRandom = ()=>{
    rn = randomNum
    setRandomNum(Math.floor(Math.random() * num))
    console.log(randomNum);
  }
    const rnf = () => {
    let hr = data[rn];
    return (
      <div className="hr-card">
        <p className="randomword">{hr.word}</p>
        <p  className="randomtranslate">{hr.translate}</p>
      </div>
    );
  };

  return (
    <div>
      <div className="home-inner">
        {num >= 1 ? (
          <div className="home-stat">
            <p className='saved-stat'>
              Saved words: <span>{num}w</span>
            </p>
             
            <div onClick={()=>clickRandom()} className="home-random">{rnf()}</div>
            <Link className="home-btn main-btn" to="/saved">
              See all
            </Link>
          </div> 
        ) : (
          <div>
            {" "}
            <div className="oops-section">
              <img src="../assets/oops.png" alt="Oops..." />
            <Link className="main-btn" to="/addcard">
              Add first word
            </Link>
            </div>
          </div>
        )}
      </div> 
    </div>
  );
}

export default Home;
