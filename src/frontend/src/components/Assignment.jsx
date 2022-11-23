import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import fetchService from "../services/fetchService";
import useLocalState from "../useLocalStorage";

const Assignment = () => {
  const assignmentId = window.location.href.split("/assignments/")[1];
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [assignment, setAssignment] = useState({
    branch: "",
    githubUrl: "",
  });

  useEffect(() => {
    fetchService(
      `http://localhost:8080/api/assignments/${assignmentId}`,
      "get",
      jwt
    ).then((assignmentData) => {
      if (assignmentData.branch === null) assignmentData.branch = "";
      if (assignmentData.githubUrl === null) assignmentData.githubUrl = "";
      setAssignment(assignmentData);
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
    ).then((data) => setAssignment(data));
  }
  return (
    <div>
      <h1>Assignment {assignmentId}</h1>
      {assignment ? (
        <>
          <h2>Status : {assignment.status}</h2>
          <h3>
            Github Url :{" "}
            <input
              type="url"
              id="githubUrl"
              value={assignment.githubUrl}
              onChange={(event) =>
                updateAssignment("githubUrl", event.target.value)
              }
            />
          </h3>
          <h3>
            Branch :{" "}
            <input
              type="text"
              id="branch"
              value={assignment.branch}
              onChange={(e) => updateAssignment("branch", e.target.value)}
            />
          </h3>
          <button onClick={() => save()}>Submit Assignment</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Assignment;
