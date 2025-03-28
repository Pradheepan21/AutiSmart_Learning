import React, { createContext, useState, useEffect } from "react";
import { loginUser, registerUser, logoutUser } from "../api/authapi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
      const res = await loginUser(credentials);
      if (res && res.success && res.user && res.token) {
        setUser(res.user);
        setToken(res.token);

        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("token", res.token); // Fix: Previously overwriting user data

        return { success: true };
      } else {
        return { success: false, message: res.message || "Login failed" };
      }
    } catch (err) {
      return { success: false, message: "Login error" };
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (userData) => {
    setLoading(true);
    try {
      const res = await registerUser(userData);
      if (res && res.success && res.user && res.token) {
        setUser(res.user);
        setToken(res.token);

        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("token", res.token);

        return { success: true };
      } else {
        return { success: false, message: res.message || "Registration failed" };
      }
    } catch (err) {
      return { success: false, message: "Registration error" };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        handleLogin,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
