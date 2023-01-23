import React from "react";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import fetchService from "../services/fetchService";
import useLocalState from "../useLocalStorage";
import StatusBadge from "./StatusBadge";
import jwt_decode from "jwt-decode";
import { Button, Card, Badge, Row, Col, Container } from "react-bootstrap";
import { useUser } from "./UserProvider";

export default function CodeReviewDashboard() {
  let navigate = useNavigate();
  const user = useUser();
  const [assignments, setAssignments] = useState(null);

  useEffect(() => {
    fetchService("http://localhost:8080/api/assignments", "get", user.jwt).then(
      (assignmentsData) => {
        console.log(assignmentsData);
        setAssignments(assignmentsData);
      }
    );
  }, []);

  function claimAssignment(assignment) {
    const decodedJwt = jwt_decode(user.jwt);
    const u = {
      username: decodedJwt.sub,
      authorities: decodedJwt.authorities,
    };
    assignment.codeReviewer = u;
    assignment.status = "In Review";

    fetchService(
      `http://localhost:8080/api/assignments/${assignment.id}`,
      "put",
      user.jwt,
      assignment
    ).then((updatedAssignment) => {
      const assignmentsCopy = [...assignments];
      const i = assignmentsCopy.findIndex((a) => a.id === assignment.id);
      assignmentsCopy[i] = updatedAssignment;
      setAssignments(assignmentsCopy);
    });
  }

  function reviewAssignment(assignment) {
    navigate(`/assignments/${assignment.id}`);
  }

  return (
    <Container style={{ margin: "2rem" }}>
      <Row>
        <Col>
          <div
            className="d-flex justify-content-end"
            style={{ cursor: "pointer" }}
            onClick={() => {
              user.setJwt(null);
              navigate("/login");
            }}
          >
            Logout
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="h1">Code Reviewer Dashboard</div>
        </Col>
      </Row>

      <div className="assignment-wrapper in-review">
        <div className="h3 px-2 assignment-wrapper-title">In Review </div>
        {assignments &&
        assignments.filter((assignment) => assignment.status === "In Review")
          .length > 0 ? (
          <div
            className="d-grid gap-5"
            style={{
              gridTemplateColumns: "repeat(auto-fill, 18rem)",
            }}
          >
            {assignments
              .filter((assignment) => assignment.status === "In Review")
              .map((assignment) => (
                <Card
                  key={assignment.id}
                  style={{ width: "18rem" }}
                  className="shadow"
                >
                  <Card.Body className="d-flex flex-column justify-content-around">
                    <Card.Title>Assignment #{assignment.number}</Card.Title>
                    <div className="d-flex align-items-start">
                      <StatusBadge text={assignment.status} />
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
                      onClick={() => reviewAssignment(assignment)}
                    >
                      Check
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="assignment-wrapper submitted">
        <div className="h3 px-2 assignment-wrapper-title">Awaiting Review </div>
        {assignments &&
        assignments.filter(
          (assignment) =>
            assignment.status === "Submitted" ||
            assignment.status === "Resubmitted"
        ).length > 0 ? (
          <div
            className="d-grid gap-5"
            style={{
              gridTemplateColumns: "repeat(auto-fill, 18rem)",
            }}
          >
            {assignments
              .filter(
                (assignment) =>
                  assignment.status === "Submitted" ||
                  assignment.status === "Resubmitted"
              )
              .sort((a, b) => {
                if (a.status === "Resubmitted") {
                  return -1;
                } else {
                  return 1;
                }
              })
              .map((assignment) => (
                <Card
                  key={assignment.id}
                  style={{ width: "18rem" }}
                  className="shadow"
                >
                  <Card.Body className="d-flex flex-column justify-content-around">
                    <Card.Title>Assignment #{assignment.number}</Card.Title>
                    <div className="d-flex align-items-start">
                      <StatusBadge text={assignment.status} />
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
                      onClick={() => claimAssignment(assignment)}
                    >
                      Claim
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <div>No Assignments Found.</div>
        )}
      </div>

      <div className="assignment-wrapper needs-to-update">
        <div className="h3 px-2 assignment-wrapper-title">Needs Update </div>
        {assignments &&
        assignments.filter((assignment) => assignment.status === "Needs Update")
          .length > 0 ? (
          <div
            className="d-grid gap-5"
            style={{
              gridTemplateColumns: "repeat(auto-fill, 18rem)",
            }}
          >
            {assignments
              .filter((assignment) => assignment.status === "Needs Update")
              .map((assignment) => (
                <Card
                  key={assignment.id}
                  style={{ width: "18rem" }}
                  className="shadow"
                >
                  <Card.Body className="d-flex flex-column justify-content-around">
                    <Card.Title>Assignment #{assignment.number}</Card.Title>
                    <div className="d-flex align-items-start">
                      <StatusBadge text={assignment.status} />
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
                      onClick={() => {
                        navigate(`/assignments/${assignment.id}`);
                      }}
                    >
                      View
                    </Button>
                  </Card.Body>
                </Card>
              ))}
          </div>
        ) : (
          <div>No Assignments Found.</div>
        )}
      </div>
    </Container>
  );
}
