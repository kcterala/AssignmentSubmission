import React from "react";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import fetchService from "../services/fetchService";
import useLocalState from "../useLocalStorage";
import { Button, Card, Row, Col } from "react-bootstrap";
import StatusBadge from "../components/StatusBadge";
import { useUser } from "../components/UserProvider";

const Dashboard = () => {
  let navigate = useNavigate();
  const user = useUser();
  const [assignments, setAssignments] = useState(null);

  useEffect(() => {
    fetchService("http://localhost:8080/api/assignments", "get", user.jwt).then(
      (assignmentsData) => setAssignments(assignmentsData)
    );
    if (!user.jwt) navigate("/login");
  }, [user.jwt]);

  function createAssignment() {
    fetchService(
      "http://localhost:8080/api/assignments",
      "post",
      user.jwt
    ).then((assignment) => {
      navigate(`/assignments/${assignment.id}`);
    });
  }
  return (
    <div style={{ margin: "2rem" }}>
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
                  onClick={() => navigate(`/assignments/${assignment.id}`)}
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
