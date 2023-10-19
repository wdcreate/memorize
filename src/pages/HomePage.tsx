import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import MainScreen from "../components/MainScreen";
import "./styles/HomePage.scss";
import { ICardMain } from "../types/cardTypes";

type HomeType = {
  data: ICardMain[];
  num: number;
};

const shuffle = (arr: ICardMain[]) => arr.sort(() => Math.random() - 0.5);

function Home({ data, num }: HomeType) {
  const [newArr, setNewArr] = useState<ICardMain[]>(shuffle([...data]));
  const [i, setI] = useState<number>(0);
  const [showTranslate, setShowTranslate] = useState<boolean>(false);
  const { user, noUser } = UserAuth();

  const randomCard = useMemo((): ICardMain | undefined => {
    if (!newArr || i < 0 || i >= newArr.length) return undefined;
    return newArr[i];
  }, [newArr, i]);

  const randomizeCard = (): void => {
    if (i < newArr.length - 1) {
      setI(i + 1);
      setShowTranslate(false);
    } else {
      setNewArr(shuffle([...data]));
      setI(0);
      setShowTranslate(false);
    }
  };
  
  const handleTranslate = (): void => {
    if (showTranslate === false) {
      setShowTranslate(true);
    } else {
      setShowTranslate(false);
    }
  };

  return (
    <div>
      {noUser ? (
        <MainScreen />
      ) : (
        <div className="home-inner">
          <div className="welcome">
            Hello, <span>{user?.displayName}</span>!
          </div>
          {num >= 1 && randomCard ? (
            <div className="home-stat">
              <Link className="saved-stat" to="/saved">
                TOTAL SAVED: <span>{num}</span>{" "}
                <div className="btm">
                  <p>Check all</p>
                  <img
                    src={require("../assets/left-arrow.svg").default}
                    alt="to saved"
                  />
                </div>
              </Link>

              <div className="home-random">
                <div className="hr-card">
                  <p onClick={randomizeCard} className="randomword">
                    {randomCard.word}
                  </p>
                  <p
                    onClick={handleTranslate}
                    style={
                      !showTranslate
                        ? { textShadow: "0 0 13px #000", color: "transparent" }
                        : { color: "#000" }
                    }
                    className="randomtranslate"
                  >
                    {randomCard.translate}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {" "}
              <div className="oops-section">
                <img src={require("../assets/oops.png")} alt="Oops..." />
                <Link className="main-btn" to="/addcard">
                  Add first word
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
