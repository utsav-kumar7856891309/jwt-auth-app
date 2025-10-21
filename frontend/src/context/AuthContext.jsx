import React from "react";
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const getStoredData = () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const user =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));
    return { token, user };
  };
  const [user, setUser] = useState(getStoredData().user);
  const [token, setToken] = useState(getStoredData().token);
  const [logoutTimer, setLogoutTimer] = useState(null);
  const getTokenExpiry = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000; 
    } catch {
      return null;
    }
  };
  useEffect(() => {
    if (!token) return;
    const expiryTime = getTokenExpiry(token);
    const now = Date.now();
    if (expiryTime <= now) {
      logout();
    } else {
      const timeRemaining = expiryTime - now;
      const timer = setTimeout(() => logout(), timeRemaining);
      setLogoutTimer(timer);
    }
    return () => clearTimeout(logoutTimer);
  }, [token]);
  const login = (data, remember) => {
    if (remember) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    } else {
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
    }
    setToken(data.token);
    setUser(data.user);
  };
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setUser(null);
    setToken(null);
    if (logoutTimer) clearTimeout(logoutTimer);
  };
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

