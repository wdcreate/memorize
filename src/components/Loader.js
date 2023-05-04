import React from "react";
import "./styles/Loader.scss";

const Loader = () => {
  return (
    <div className="loader-inner">
      <div className="loader">
        <img src="./assets/m.png" alt="logo" className="loader-logo" />
      </div>
    </div>
  );
};

export default Loader;
