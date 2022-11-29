import React from "react";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import fetchService from "../services/fetchService";
import useLocalState from "../useLocalStorage";
import { Button, Card } from "react-bootstrap";

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
        window.location.href = `/assignments/${assignment.id}`;
      }
    );
  }
  return (
    <div style={{ margin: "2rem" }}>
      <div className="mb-5">
        <Button size="lg" onClick={() => createAssignment()}>
          Submit new assignment
        </Button>
      </div>
      {assignments ? (
        <div
          className="d-grid gap-5"
          style={{
            gridTemplateColumns: "repeat(auto-fill, 18rem)",
          }}
        >
          {assignments.map((assignment) => (
            <Card key={assignment.id} style={{ width: "18rem" }}>
              <Card.Body className="d-flex flex-column justify-content-around">
                <Card.Title>Assignment #{assignment.id}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {assignment.status}
                </Card.Subtitle>
                <Card.Text>
                  <p>
                    <b>GitHub Url</b>: {assignment.githubUrl}
                  </p>
                  <p>
                    <b>Branch</b>: {assignment.branch}
                  </p>
                </Card.Text>
                <Button
                  variant="secondary"
                  onClick={() =>
                    (window.location.href = `/assignments/${assignment.id}`)
                  }
                >
                  Edit
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;
