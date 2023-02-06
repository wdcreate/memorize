import React from 'react';


const Loader= () => {

  return (
    <div className='loader-inner'>
      <img src="./logo.png" alt="logo" className="loader-logo"/>
      <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>    </div>
  );
};

export default Loader;