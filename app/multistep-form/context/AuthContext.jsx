"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect(() => {
  const checkAuth = () => {
    const token = localStorage.getItem("userToken");
    const currentUser = localStorage.getItem("currentUser");

    console.log("Token:", token);
    console.log("CurrentUser:", currentUser);

    // Dono honay chahiye
    if (token && currentUser) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  checkAuth();
  window.addEventListener("storage", checkAuth);
  return () => window.removeEventListener("storage", checkAuth);
}, []);



  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
