import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Account = () => {
  const { user, logout, triggerResetEmail, verifyEmail } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log('You are logged out')
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div >
      <h1 >Account</h1>
      <div className='account-settings'>
         <span>User Email:</span> 
          <p> {user && user.email}</p>
        </div>
      <div className='account-settings'>
         <span>Reset Password:</span> 
          <button type='button' onClick={triggerResetEmail}>
          Set new
        </button>
        </div>
      <div className='account-settings'>
        <span>Account Verification:</span>
        {!user.emailVerified?
          <button type='button' onClick={verifyEmail} >
          Verify
        </button> : <button type='button' className='verified' disabled >
          Verified
        </button>     
      }
        </div>
      <button onClick={handleLogout} >
        Logout
      </button>
    </div>
  );
};

export default Account;