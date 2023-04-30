import React from "react";
import "./styles/Loader.scss";

const Loader = () => {
  return (
    <div className="loader-inner">
      <img src="./assets/m.png" alt="logo" className="loader-logo" />
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
