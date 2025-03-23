import React from "react";
import { Navigate } from "react-router-dom";
import { notification } from 'antd';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true"; 

  if (!isLoggedIn) {
    notification.warning({
      message: 'Action Not Allowed',
      description: 'You must be logged in to access this page.',
    });

    return <Navigate to="/login" replace />; 
  }

  return children;
};

export default ProtectedRoute;