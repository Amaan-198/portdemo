import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // If user is logged in, show the page (Outlet). Otherwise, redirect to /login.
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;