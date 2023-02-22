import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {UserAuth} from '../context/AuthContext';
import "./styles/LoginPage.scss"

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();
  const {loginResetEmail} = UserAuth();
  //const { user } = UserAuth();
  const { googleAuth } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      navigate('/account')      
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  };
  return (
    <div className='auth-form login-form'>
      <div >
        <h1 >Sign in to your account</h1>
        <p className='intro'>
          Don't have an account yet?{' '}
          <Link to='/signup' >
            Sign up.
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div >
          <label >Email Address</label>
          <input onChange={(e) => setEmail(e.target.value)}  type='email' placeholder='place for email'/>
        </div>
        <div >
          <label >Password</label>
          <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='place for password'/>
        </div>
        <button type='submit' className='main-btn'>
          Sign In
        </button>
      </form>
      <div className='resetpass'>
         <span>Forgot password?</span> 
          <button type='button' onClick={()=>loginResetEmail(email)}>
          Set new
        </button>
        </div>
        <div className="google-btn" onClick={() => googleAuth()}>
        <div className="google-icon-wrapper">
          <img className="google-icon" alt="logo" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
        </div>
        <p className="btn-text">
          <b>Sign in with Google</b>
        </p>
      </div>
    </div>
  );
};

export default Signin;