import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Container,
  Badge,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
import fetchService from "../services/fetchService";
import useLocalState from "../useLocalStorage";
import { Form, Col, Row, DropdownButton } from "react-bootstrap";
import { useRef } from "react";

const Assignment = () => {
  const assignmentId = window.location.href.split("/assignments/")[1];
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignment, setAssignment] = useState({
    branch: "",
    githubUrl: "",
    number: null,
    status: null,
  });
  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [assignmentStatuses, setAssignmentStatuses] = useState([]);

  useEffect(() => {
    fetchService(
      `http://localhost:8080/api/assignments/${assignmentId}`,
      "get",
      jwt
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
  // console.log(prevAssignmentValue);

  function updateAssignment(prop, value) {
    const newAssignment = { ...assignment };
    newAssignment[prop] = value;
    setAssignment(newAssignment);
  }

  function save() {
    if (assignment.status === assignmentStatuses[0].status) {
      updateAssignment("status", assignmentStatuses[1].status);
    } else {
      persist();
    }
    // .then((window.location.href = `/`));
  }

  function persist() {
    fetchService(
      `http://localhost:8080/api/assignments/${assignmentId}`,
      "put",
      jwt,
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
          <Badge bg="danger" style={{ fontSize: "1rem" }}>
            {assignment.status}
          </Badge>{" "}
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
          <div className="d-flex gap-5">
            <Button onClick={() => save()}>Submit Assignment</Button>
            <Button
              variant="secondary"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Back
            </Button>
          </div>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Assignment;
