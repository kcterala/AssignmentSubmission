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

const Assignment = () => {
  const assignmentId = window.location.href.split("/assignments/")[1];
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignment, setAssignment] = useState({
    branch: "",
    githubUrl: "",
  });
  const [assignmentEnums, setAssignmentEnums] = useState([]);

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
    });
  }, []);

  function updateAssignment(prop, value) {
    const newAssignment = { ...assignment };
    newAssignment[prop] = value;
    setAssignment(newAssignment);
  }

  function save() {
    fetchService(
      `http://localhost:8080/api/assignments/${assignmentId}`,
      "put",
      jwt,
      assignment
    )
      .then((data) => setAssignment(data))
      .then((window.location.href = `/`));
  }
  return (
    <Container className="mt-5">
      <Row className="d-flex align-items-center">
        <Col>
          <h1>Assignment {assignmentId}</h1>
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
                id={`assignmentName`}
                variant={"info"}
                title={"Assignment 1"}
              >
                {assignmentEnums.map((e) => (
                  <Dropdown.Item eventKey={e.assignmentNum}>
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
                id="githubUrl"
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
                id="branch"
                type="text"
                value={assignment.branch}
                onChange={(e) => updateAssignment("branch", e.target.value)}
                defaultValue="#branchname"
              />
            </Col>
          </Form.Group>
          <Button onClick={() => save()}>Submit Assignment</Button>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Assignment;
