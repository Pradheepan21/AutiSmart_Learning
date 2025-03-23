import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';
import { notification } from 'antd';

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      logout();
      notification.success({
        message: 'Successfully logged out',
        description: 'You have logged out successfully.',
      });
      setTimeout(() => {
        navigate('/');
      }, 500);
    };

    handleLogout();
  }, [logout, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md text-blue-800 text-center">
        <h1 className="text-2xl font-bold">Logging out...</h1>
        <p className="text-gray-600">You will be redirected to the Sign Up page shortly.</p>
      </div>
    </div>
  );
};

export default Logout;
