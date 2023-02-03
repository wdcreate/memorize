import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {UserAuth} from '../context/AuthContext';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();
  const { triggerResetEmail } = UserAuth();
  const { user } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      navigate('/account')
      //console.log(user)
      
    } catch (e) {
      setError(e.message)
      console.log(e.message)
      //console.log(error)
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
      
    </div>
  );
};

export default Signin;