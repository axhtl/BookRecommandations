import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authId, setAuthId] = useState(() => {
    const savedAuthId = localStorage.getItem("authId");
    return savedAuthId ? JSON.parse(savedAuthId) : null;
  });

  const [nickname, setNickname] = useState();
  const [membername, setMembername] = useState();

  const signUp = (id, nickname, membername) => {
    setAuthId(id);
    setNickname(nickname);
    setMembername(membername);
    localStorage.setItem("authId", JSON.stringify(id));
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("membername", membername);
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
    <AuthContext.Provider
      value={{ authId, signUp, signIn, membername, nickname }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
