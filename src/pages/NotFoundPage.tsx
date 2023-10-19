import React from 'react';
import './styles/NotFoundPage.scss'
import { Link } from 'react-router-dom';

function NotFoundPage() {


  return (
    <div className='notfoundpage'>
      <img src={require("../assets/404.png")} alt="" />
      <Link to="/">Go to Home </Link>
    </div>
  );
}
export default NotFoundPage;
