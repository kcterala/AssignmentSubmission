import React from "react";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import fetchService from "../services/fetchService";
import useLocalState from "../useLocalStorage";
import { Button, Card, Badge, Row, Col } from "react-bootstrap";

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
      <Row>
        <Col>
          <div
            className="d-flex justify-content-end"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setJwt(null);
              window.location.href = "/login";
            }}
          >
            Logout
          </div>
        </Col>
      </Row>
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
                <Card.Title>Assignment #{assignment.number}</Card.Title>
                <div className="d-flex align-items-start">
                  <Badge
                    bg={
                      assignment.status === "Completed" ? "success" : "danger"
                    }
                    style={{ fontSize: "1rem" }}
                  >
                    {assignment.status}
                  </Badge>
                </div>

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
