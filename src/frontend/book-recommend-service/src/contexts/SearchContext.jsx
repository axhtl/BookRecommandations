import React, { createContext, useEffect, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    console.log(keyword);
  }, [keyword]);

  return (
    <SearchContext.Provider value={{ keyword, setKeyword }}>
      {children}
    </SearchContext.Provider>
  );
};
