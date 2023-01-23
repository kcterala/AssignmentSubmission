import React from "react";
import { useUser } from "./UserProvider";
import useInterval from "./useInterval";
import dayjs from "dayjs";
import Comment from "./Comment";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import fetchService from "../services/fetchService";

const CommentContainer = (props) => {
  const { assignmentId } = props;
  const user = useUser();
  const [comment, setComment] = useState({
    id: null,
    text: "",
    assignmentId: assignmentId != null ? parseInt(assignmentId) : null,
    user: user.jwt,
    createdDate: null,
  });

  const [comments, setComments] = useState([]);
  const emptyComment = {
    id: null,
    text: "",
    assignmentId: assignmentId != null ? parseInt(assignmentId) : null,
    user: user.jwt,
    createdDate: null,
  };

  //fetch comments
  useEffect(() => {
    fetchService(
      `http://localhost:8080/api/comments?assignmentId=${assignmentId}`,
      "get",
      user.jwt,
      null
    ).then((commentsData) => setComments(commentsData));
  }, []);
  //update comment
  function updateComment(value) {
    const commentCopy = { ...comment };
    commentCopy.text = value;
    setComment(commentCopy);
  }

  //interval

  useInterval(() => {
    updateCommentTimeDisplay();
  }, 1000 * 5);

  function updateCommentTimeDisplay() {
    const commentsCopy = [...comments];
    commentsCopy.forEach((com) => (com.createdDate = dayjs(com.createdDate)));
    formatComments(commentsCopy);
  }

  //submit comment
  function submitComment() {
    if (comment.id) {
      console.log(comment);
      fetchService(
        `http://localhost:8080/api/comments/${comment.id}`,
        "put",
        user.jwt,
        comment
      ).then((d) => {
        const copy = [...comments];
        const i = copy.findIndex((comm) => comm.id === d.id);
        copy[i] = d;
        setComments(copy);
      });
    } else {
      fetchService(
        `http://localhost:8080/api/comments`,
        "post",
        user.jwt,
        comment
      ).then((c) => {
        const commentsCopy = [...comments];
        commentsCopy.push(c);
        setComments(commentsCopy);
      });
    }
    setComment(emptyComment);
  }

  //delete Comment
  function handleDeleteComment(commentId) {
    // TODO: send DELETE request to server
    fetchService(
      `http://localhost:8080/api/comments/${commentId}`,
      "delete",
      user.jwt
    ).then((msg) => {
      const commentsCopy = [...comments];
      const i = commentsCopy.findIndex((comment) => comment.id === commentId);
      commentsCopy.splice(i, 1);
      formatComments(commentsCopy);
    });
  }
  function formatComments(commentsCopy) {
    commentsCopy.forEach((comment) => {
      if (typeof comment.createDate === "string") {
        comment.createDate = dayjs(comment.createDate);
      }
    });
    setComments(commentsCopy);
  }

  //edit comment
  function handleEditComment(id) {
    const i = comments.findIndex((comment) => comment.id === id);
    const commentCopy = {
      id: comments[i].id,
      text: comments[i].text,
      assignmentId: assignmentId != null ? parseInt(assignmentId) : null,
      user: user.jwt,
      createdDate: comments[i].createdDate,
    };
    setComment(commentCopy);
  }

  return (
    <div>
      <div className="mt-5">
        <textarea
          style={{ width: "100%", borderRadius: "0.25rem" }}
          onChange={(e) => updateComment(e.target.value)}
          value={comment.text}
        ></textarea>
      </div>
      <Button onClick={() => submitComment()}>Post Comment</Button>
      <div className="mt-5">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            commentData={comment}
            emitDeleteComment={handleDeleteComment}
            emitEditComment={handleEditComment}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentContainer;
