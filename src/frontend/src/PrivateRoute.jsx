import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import useLocalState from "./useLocalStorage";
import fetchSerivce from "./services/fetchService";
const PrivateRoute = ({ children }) => {
  const [token, setToken] = useLocalState("", "jwt");
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);
  if (!token) {
    return <Navigate to="/login" />;
  }
  if (token) {
    fetchSerivce(
      `http://localhost:8080/api/auth/validate?token=${token}`,
      "get",
      token
    ).then((isValid) => {
      console.log(isValid);
      setIsValid(isValid);
      setIsLoading(false);
    });
  }
  return isLoading ? (
    <div>Loading mf...</div>
  ) : isValid ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
