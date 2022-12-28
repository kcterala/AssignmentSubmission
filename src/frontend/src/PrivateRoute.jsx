import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import useLocalState from "./useLocalStorage";
import fetchSerivce from "./services/fetchService";
import { useUser } from "./components/UserProvider";

const PrivateRoute = ({ children }) => {
  const user = useUser();
  // const [token, setToken] = useLocalState("", "jwt");
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);
  // if (!user) {
  //   return <Navigate to="/login" />;
  // }
  if (user) {
    fetchSerivce(
      `http://localhost:8080/api/auth/validate?token=${user.jwt}`,
      "get",
      user.jwt
    ).then((isValid) => {
      isValid;
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
