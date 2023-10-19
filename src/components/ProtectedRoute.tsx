import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { IChildren } from '../types/contextTypes';

const ProtectedRoute = ({ children}:IChildren) => {
  const { noUser } = UserAuth();
  if (noUser) {
    return <Navigate to='/' />;
  }
  return children;
};

export default ProtectedRoute;