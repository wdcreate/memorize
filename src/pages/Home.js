import React from "react";
import { Link } from "react-router-dom";

function Home({ data, num }) {
  const rnf = () => {
    let rn = Math.floor(Math.random() * num);
    let hr = data[rn];
    return (
      <div className="saved-card hr-card">
        <p className="randomword">{hr.word}</p>
        <p className="randomtranslate">{hr.translate}</p>
      </div>
    );
  };

  return (
    <div>
      <h2>Home</h2>
      <div className="home-inner">
        {num >= 1 ? (
          <div className="home-stat">
            <p>
              Saved words: <span>{num}</span>
            </p>
             
            <div className="home-random">{rnf()}</div>
            <Link className="home-btn main-btn" to="/saved">
              See all
            </Link>
          </div> 
        ) : (
          <div>
            {" "}
            You dont have any saved word.
            <Link className="main-btn" to="/addcard">
              Save your first word
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
