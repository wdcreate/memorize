import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "./styles/HomePage.scss"

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);
function Home({ data, num }) {
  const [newArr, setNewArr] = useState(shuffle([...data]));
  const [i, setI] = useState(0);
  const { user } = UserAuth();

  const randomCard = useMemo(() => {
    if (!newArr || i < 0 || i >= newArr.length) return undefined;
    return newArr[i];
  }, [newArr, i]);

  const randomizeCard = () => {
    if (i < newArr.length - 1) {
      setI(i + 1);
    } else {
      setNewArr(shuffle([...data]));
      setI(0);
    }
  };

  return (
    <div>
      {!user ? <div className='home-nouser'>
        <p>You can save words here</p>
        <p>register new account or log in in your acccount</p>
        <div className='header-links'>
          <Link to="/login">
        log in
      </Link>
      <Link to="/signup">
        sign up
      </Link></div>
      </div> : <div className="home-inner">
        {num >= 1 && randomCard ? (
          <div className="home-stat">
            <p className="saved-stat">
              Saved words: <span>{num}</span>
            </p>
            <div onClick={randomizeCard} className="home-random">
              <div className="hr-card">
                <p className="randomword">{randomCard.word}</p>
                <p className="randomtranslate">{randomCard.translate}</p>
              </div>
            </div>
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

      </div>}   
    </div>
  );
}

export default Home;
