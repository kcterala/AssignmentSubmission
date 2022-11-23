import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import fetchService from "../services/fetchService";
import useLocalState from "../useLocalStorage";

const Dashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignments, setAssignments] = useState(null);

  useEffect(() => {
    fetchService("http://localhost:8080/api/assignments", "get", jwt).then(
      (assignmentsData) => setAssignments(assignmentsData)
    );
  }, []);

  function createAssignment() {
    fetchService("http://localhost:8080/api/assignments", "post", jwt).then(
      (assignment) => {
        window.location.href = `http://localhost:8080/${assignment.id}`;
      }
    );
  }
  return (
    <div style={{ margin: "2rem" }}>
      {assignments ? (
        assignments.map((assignment) => (
          <div key={assignment.id}>
            <Link to={`/assignments/${assignment.id}`}>
              Assignment Id : {assignment.id}
            </Link>
          </div>
        ))
      ) : (
        <></>
      )}
      <button onClick={() => createAssignment()}>Submit new assignment</button>
    </div>
  );
};

export default Dashboard;
