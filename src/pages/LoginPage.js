import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleButton  from '../components/GoogleButton';
import {UserAuth} from '../context/AuthContext';
import "./styles/LoginPage.scss"

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();
  const {loginResetEmail} = UserAuth();
  const {setNoUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      navigate('/account')
      setNoUser(false)      
    } catch (e) {
      setError(e.message)
      console.log(error)
    }
  };
  return (
    <div className='auth-form login-form'>
      <div >
        <h1 >Log in</h1>
      </div>
     <GoogleButton />
      <div className="or-block">
        OR
        </div>
      <form onSubmit={handleSubmit}>
        <div >
          <label for="login-email" >Email Address</label>
          <input onChange={(e) => setEmail(e.target.value)} placeholder="place for email" id='login-email'  type='email' />
        </div>
        <div >
          <label for="login-pass">Password</label>
          <input onChange={(e) => setPassword(e.target.value)} placeholder="place for password
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          " id="login-pass" type='password' />
        </div>
      <div className='resetpass'>
          <button type='button' onClick={()=>loginResetEmail(email)}>
          Forgot password?
        </button>
        </div>
      <button type='submit' className='login-btn'>
          Sign In
        </button>
      </form>

    </div>
  );
};

export default Signin;