import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../../../context/userContext';

const ColaboradorRoute = ({ children }) => {
  const { user } = useUser();
  const isAuthenticated = !!localStorage.getItem('access_token');

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  if (user.role !== 'Colaborador') {
    return <Navigate to="/app/inicio" replace />;
  }

  return children;
};

export default ColaboradorRoute;