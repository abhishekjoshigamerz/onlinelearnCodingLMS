import { useSelector } from "react-redux";
import { useLocation,Navigate, Outlet } from "react-router-dom";

import { selectAccessToken } from "./authSlice"; 

import React from 'react';

const RequireAuth = () => {
    const token = useSelector(selectAccessToken);
    console.log(token);
    const location = useLocation();


  return (
    token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth;
