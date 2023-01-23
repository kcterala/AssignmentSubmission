import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Container, Dropdown, ButtonGroup } from "react-bootstrap";
import fetchService from "../services/fetchService";
import useLocalState from "../useLocalStorage";
import { Form, Col, Row, DropdownButton } from "react-bootstrap";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import { useUser } from "./UserProvider";
import CommentContainer from "./CommentContainer";

const CodeReviewAssignment = () => {
  let navigate = useNavigate();
  const { assignmentId } = useParams();
  const user = useUser();
  const [assignment, setAssignment] = useState({
    branch: "",
    githubUrl: "",
    number: null,
    status: null,
  });
  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [assignmentStatuses, setAssignmentStatuses] = useState([]);
  const [comment, setComment] = useState({
    text: "",
    assignmentId: assignmentId != null ? parseInt(assignmentId) : null,
    user: user.jwt,
  });

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
  useEffect(() => {
    fetchService(
      `http://localhost:8080/api/comments?assignmentId=${assignmentId}`,
      "get",
      user.jwt,
      null
    ).then((comments) => console.log(comments));
  }, []);

  function submitComment() {
    fetchService(
      `http://localhost:8080/api/comments`,
      "post",
      user.jwt,
      comment
    ).then((comment) => console.log(comment));
  }

  function updateComment(value) {
    const commentCopy = { ...comment };
    commentCopy.text = value;
    setComment(commentCopy);
  }
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
    // .then(navigate("/"));
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
                readOnly
                onChange={(event) =>
                  updateAssignment("githubUrl", event.target.value)
                }
                value={assignment.githubUrl}
                placeholder="http://github.com/username/repo-name"
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
                readOnly
                value={assignment.branch}
                onChange={(e) => updateAssignment("branch", e.target.value)}
                placeholder="#branchname"
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="3" md="2">
              Video Review URL
            </Form.Label>
            <Col sm="9" md="8" lg="6">
              <Form.Control
                type="text"
                value={assignment.codeReviewVideoUrl}
                onChange={(e) =>
                  updateAssignment("codeReviewVideoUrl", e.target.value)
                }
                placeholder="https://youtube.com/"
              />
            </Col>
          </Form.Group>
          <div className="d-flex gap-5">
            {assignment.status === "Completed" ? (
              <Button onClick={() => save(assignmentStatuses[2].status)}>
                Re-Claim
              </Button>
            ) : (
              <Button onClick={() => save(assignmentStatuses[4].status)}>
                Complete Review
              </Button>
            )}

            {assignment.status === "Needs Update" ? (
              <Button
                variant="secondary"
                onClick={() => save(assignmentStatuses[2].status)}
              >
                Re-Claim
              </Button>
            ) : (
              <Button
                variant="danger"
                onClick={() => save(assignmentStatuses[3].status)}
              >
                Reject Assignment
              </Button>
            )}

            <Button
              variant="secondary"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Back
            </Button>
          </div>

          <CommentContainer assignmentId={assignmentId} />
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default CodeReviewAssignment;
