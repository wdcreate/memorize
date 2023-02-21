import React from 'react';
import "./styles/Loader.css"

const Loader= () => {
  return (
    <div className='loader-inner'>
      <img src="./logo.png" alt="logo" className="loader-logo"/>
      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>    </div>
  );
};

export default Loader;