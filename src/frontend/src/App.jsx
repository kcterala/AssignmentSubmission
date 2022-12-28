import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Assignment from "./components/Assignment";
import Dashboard from "./Dashboard";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import jwt_decode from "jwt-decode";
import PrivateRoute from "./PrivateRoute";
import fetchService from "./services/fetchService";
import CodeReviewDashboard from "./components/CodeReviewDashboard";
import CodeReviewAssignment from "./components/CodeReviewAssignment";
import useLocalState from "./useLocalStorage";
import { UserProvider, useUser } from "./components/UserProvider";

function App() {
  // const [token, setToken] = useLocalState("", "jwt");
  const user = useUser();
  const [roles, setRoles] = useState(getRoleFromJwt());

  function getRoleFromJwt() {
    if (user.jwt) {
      const decodedJwt = jwt_decode(user.jwt);
      return decodedJwt.authorities;
    }
    return [];
  }
  useEffect(() => {
    if (!user.jwt) {
      const reqBody = {
        username: "kcterala",
        password: "asdfasdf",
      };
      fetch("http://localhost:8080/api/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
        method: "post",
      })
        .then((res) => Promise.all([res.json(), res.headers]))
        .then(([body, data]) => {
          const token = data.get("authorization");
          user.setJwt(token);
        });
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/dashboard"
            element={
              roles && roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
                <PrivateRoute>
                  <CodeReviewDashboard />
                </PrivateRoute>
              ) : (
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              )
            }
          />
          <Route
            path="/assignments/:id"
            element={
              roles && roles.find((role) => role === "ROLE_CODE_REVIEWER") ? (
                <PrivateRoute>
                  <CodeReviewAssignment />
                </PrivateRoute>
              ) : (
                <PrivateRoute>
                  <Assignment />
                </PrivateRoute>
              )
            }
          />
          <Route path="/hello" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
      {/* <h1>Jwt token is {token}</h1> */}
    </div>
  );
}

export default App;
