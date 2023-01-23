import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Container, Dropdown, ButtonGroup } from "react-bootstrap";
import fetchService from "../services/fetchService";
import useLocalState from "../useLocalStorage";
import { Form, Col, Row, DropdownButton } from "react-bootstrap";
import { useRef } from "react";
import StatusBadge from "./StatusBadge";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserProvider";
import CommentContainer from "./CommentContainer";

const Assignment = () => {
  const assignmentId = window.location.href.split("/assignments/")[1];
  const user = useUser();
  const [assignment, setAssignment] = useState({
    branch: "",
    githubUrl: "",
    number: null,
    status: null,
  });
  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [assignmentStatuses, setAssignmentStatuses] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    fetchService(
      `http://localhost:8080/api/assignments/${assignmentId}`,
      "get",
      user.jwt
    ).then((assignmentRes) => {
      let assignmentData = assignmentRes.assignment;
      if (assignmentData.branch === null) assignmentData.branch = "";
      if (assignmentData.githubUrl === null) assignmentData.githubUrl = "";
      setAssignment(assignmentData);
      setAssignmentEnums(assignmentRes.assignmentEnum);
      setAssignmentStatuses(assignmentRes.statusEnums);
    });
  }, []);

  const prevAssignmentValue = useRef(assignment);
  // (prevAssignmentValue);

  //Assignments
  function updateAssignment(prop, value) {
    const newAssignment = { ...assignment };
    newAssignment[prop] = value;
    setAssignment(newAssignment);
  }

  function save(status) {
    if (status && assignment.status !== status) {
      updateAssignment("status", status);
    } else {
      persist();
    }
  }

  function persist() {
    fetchService(
      `http://localhost:8080/api/assignments/${assignmentId}`,
      "put",
      user.jwt,
      assignment
    ).then((data) => setAssignment(data));
  }

  useEffect(() => {
    if (prevAssignmentValue.current.status !== assignment.status) {
      persist();
    }
    prevAssignmentValue.current = assignment;
  }, [assignment]);

  return (
    <Container className="mt-5">
      <Row className="d-flex align-items-center">
        <Col>
          {assignment.number ? <h1>Assignment {assignment.number}</h1> : ""}
        </Col>
        <Col>
          <StatusBadge text={assignment.status} />
        </Col>
      </Row>

      {assignment ? (
        <>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="3" md="2">
              Assignment Number :
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <DropdownButton
                as={ButtonGroup}
                variant={"info"}
                title={
                  assignment.number
                    ? `Assignment ${assignment.number}`
                    : "Select an Assignment"
                }
                onSelect={(selectedElement) => {
                  updateAssignment("number", selectedElement);
                }}
              >
                {assignmentEnums.map((e) => (
                  <Dropdown.Item
                    key={e.assignmentNum}
                    eventKey={e.assignmentNum}
                  >
                    {e.assignmentNum}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-3" controlId="formPlaintextEmail">
            <Form.Label column sm="3" md="2">
              Github Url
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="url"
                onChange={(event) =>
                  updateAssignment("githubUrl", event.target.value)
                }
                value={assignment.githubUrl}
                defaultValue="http://github.com/username/repo-name"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="3" md="2">
              Branch
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="text"
                value={assignment.branch}
                onChange={(e) => updateAssignment("branch", e.target.value)}
                defaultValue="#branchname"
              />
            </Col>
          </Form.Group>

          {assignment.status === "Completed" ? (
            <>
              <div>
                <Form.Group
                  as={Row}
                  className="d-flex align-items-center mb-3"
                  controlId="codeReviewVideoUrl"
                >
                  <Form.Label column sm="3" md="2">
                    Code Review Video URL
                  </Form.Label>
                  <Col sm="9" md="8" lg="6">
                    <a href={assignment.codeReviewVideoUrl}>
                      {assignment.codeReviewVideoUrl}
                    </a>
                  </Col>
                </Form.Group>
              </div>

              <div className="d-flex gap-5">
                <Button
                  variant="secondary"
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                >
                  Back
                </Button>
              </div>
            </>
          ) : assignment.status === "Pending Submission" ? (
            <div className="d-flex gap-5">
              <Button onClick={() => save("Submitted")}>
                Submit Assignment
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                Back
              </Button>
            </div>
          ) : (
            <div className="d-flex gap-5">
              <Button onClick={() => save("Resubmitted")}>
                {" "}
                Re-Submit Assignment
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                Back
              </Button>
            </div>
          )}
          {/* <div className="d-flex gap-5">
            <Button onClick={() => save()}>Submit Assignment</Button>
            <Button
              variant="secondary"
              onClick={() => {
                 navigate("/")
              }}
            >
              Back
            </Button>
          </div> */}
          <CommentContainer assignmentId={assignmentId} />
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Assignment;
