import React from "react";
import { createContext } from "react";
import useLocalState from "../useLocalStorage";
import { useContext } from "react";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const value = { jwt, setJwt };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
export { UserProvider, useUser };
