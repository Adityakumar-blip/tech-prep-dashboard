
import React from 'react';
import { Navigate } from 'react-router-dom';

// This component now just redirects to the dashboard as it's no longer needed
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
