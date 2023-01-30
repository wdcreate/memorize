import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const { createUser } = UserAuth();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUser(email, password);
      navigate('/account')
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className='auth-form login-form'>
      <div>
        <h1 >Sign up for a free account</h1>
        <p className='intro'>
          Already have an account yet?{' '}
          <Link to='/' className='underline'>
            Sign in.
          </Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div >
          <label >Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            placeholder='place for email'
          />
        </div>
        <div >
          <label >Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder='place for password'
            type='password'
          />
        </div>
        <button type='button' className='main-btn'>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;