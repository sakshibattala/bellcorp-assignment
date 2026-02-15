import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loader from "./Loader";


const ProtectedRoute = ({ children }) => {
  const { token, authLoading } = useContext(AuthContext);

  if (authLoading) {
    return <Loader />; // wait until token is restored
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
