import React from "react";

import { useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import useLocalState from "../useLocalStorage";
function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [jwt, setJwt] = useLocalState("", "jwt");

  function sendLoginRequest() {
    const reqBody = {
      username: username,
      password: password,
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
        setJwt(token);
        window.location.href = "/dashboard";
      });
  }

  return (
    <>
      <Container
        className="mt-5 align-self-center"
        style={{
          width: "50%",
        }}
      >
        <Row className="justify-content-center">
          <Col md="6" lg="8">
            <Form.Group className="mb-3">
              <Form.Label className="fs-5">User name</Form.Label>
              <Form.Control
                type="email"
                id="username"
                placeholder="Enter email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="6" lg="8">
            <Form.Group className="mb-3">
              <Form.Label className="fs-5">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col
            md="6"
            lg="8"
            className="d-flex flex-column gap-4 flex-lg-row justify-content-md-between"
          >
            <Button variant="primary" onClick={() => sendLoginRequest()}>
              Login
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Exit
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginPage;
