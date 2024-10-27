import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authId, setAuthId] = useState(null);

  const signUp = (id) => {
    setAuthId(id);
  };

  // const singIn = (memberName, memberId) => {

  // }

  return (
    <AuthContext.Provider value={{ authId, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAtuh = () => useContext(AuthContext);
