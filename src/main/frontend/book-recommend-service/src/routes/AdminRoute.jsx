// import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";
import { useEffect, useState } from "react";

const AdminRoute = ({ auth }) => {
  const [isAdminLogin, setIsAdminLogin] = useState(isAdmin());

  useEffect(() => {
    setIsAdminLogin(isAdmin());
  }, []);

  if (isAdminLogin && auth) {
    console.log("access true -> private route");
    return <Outlet />;
  } else if (isAdminLogin && !auth) {
    console.log("access false -> public route");
    return <Outlet />;
  } else if (!isAdminLogin && auth) {
    console.log("access false -> private route");
    return <Navigate to="/no-access" />;
  } else if (!isAdminLogin && !auth) {
    return <Navigate to="/intro" />;
  }
};

export default AdminRoute;
