import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import useLocalState from "./useLocalStorage";

const PrivateRoute = ({ children }) => {
  const [token, setToken] = useLocalState("", "jwt");
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
