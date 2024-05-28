import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function PrivateRoute({ element: Component, ...rest }) {
  const accessToken = localStorage.getItem('accessToken');
  const isLoggedIn = accessToken !== "" && accessToken !== null;

  return isLoggedIn ? <Route {...rest} element={<Component />} /> : <Navigate to="/" replace />;
}

export default PrivateRoute;