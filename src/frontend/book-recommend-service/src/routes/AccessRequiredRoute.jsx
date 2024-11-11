// import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isLogin } from "../utils/auth";
import { useEffect, useState } from "react";

const AccessRequiredRoute = ({ auth }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isLogin());

  useEffect(() => {
    setIsLoggedIn(isLogin());
  }, []);

  if (isLoggedIn && auth) {
    console.log("access true -> private route");
    return <Outlet />;
  } else if (isLoggedIn && !auth) {
    console.log("access false -> public route");
    return <Navigate to="/home" />;
  } else if (!isLoggedIn && auth) {
    console.log("access false -> private route");
    return <Navigate to="/no-access" />;
  } else if (!isLoggedIn && !auth) {
    return <Outlet />;
  }
};

export default AccessRequiredRoute;
