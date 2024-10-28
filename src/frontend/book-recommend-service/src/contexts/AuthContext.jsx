import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authId, setAuthId] = useState(() => {
    const savedAuthId = localStorage.getItem("authId");
    return savedAuthId ? JSON.parse(savedAuthId) : null;
  });

  const signUp = (id) => {
    setAuthId(id);
    localStorage.setItem("authId", JSON.stringify(id));
  };

  const signIn = (id) => {
    setAuthId(id);
    localStorage.setItem("authId", JSON.stringify(id));
  };

  useEffect(() => {
    if (authId) {
      localStorage.setItem("authId", JSON.stringify(authId));
    }
  }, [authId]);

  return (
    <AuthContext.Provider value={{ authId, signUp, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
