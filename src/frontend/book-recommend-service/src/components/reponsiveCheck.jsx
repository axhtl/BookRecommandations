import React from "react";
import { useMediaQuery } from "react-responsive";

export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({
    query: "(max-width:500px)",
  });
  return <>{isMobile && children}</>;
};

export const Pc = ({ children }) => {
  const isPc = useMediaQuery({
    query: "(min-width:501px)",
  });
  return <>{isPc && children}</>;
};
