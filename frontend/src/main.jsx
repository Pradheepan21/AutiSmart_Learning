import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import App from './App';
import './index.css'; import { AuthProvider } from './utils/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <App />
    </AuthProvider>
  </React.StrictMode>
);
