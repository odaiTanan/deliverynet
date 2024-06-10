import React from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
const RequiredAuth = () => {
  const user = useSelector((state) => state.user?.user?.token);
  const nav = useNavigate();
  //required authantication for many pages
  return user ? <Outlet /> : <Navigate to="/auth/signIn" />;
};

export default RequiredAuth;
