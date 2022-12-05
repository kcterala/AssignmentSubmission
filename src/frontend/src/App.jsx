import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Assignment from "./components/Assignment";
import Dashboard from "./Dashboard";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import fetchService from "./services/fetchService";
import useLocalState from "./useLocalStorage";

function App() {
  const [token, setToken] = useLocalState("", "jwt");
  useEffect(() => {
    console.log("hello");
    if (!token) {
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
          setToken(token);
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
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/assignments/:id"
            element={
              <PrivateRoute>
                <Assignment />
              </PrivateRoute>
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
