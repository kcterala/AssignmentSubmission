import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { useUser } from "./UserProvider";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect } from "react";
const Comment = (props) => {
  const user = useUser();
  const decode_jwt = jwtDecode(user.jwt);
  const { id, createdDate, createdBy, text } = props.commentData;
  const { emitDeleteComment, emitEditComment } = props;
  const [commentRelativeTime, setCommentRelativeTime] = useState("");

  useEffect(() => {
    updateCommentRelativeTime();
  }, [createdDate]);

  console.log(createdDate);
  function updateCommentRelativeTime() {
    console.log("Please print this");
    if (createdDate) {
      console.log("createdDate", createdDate);
      dayjs.extend(relativeTime);

      if (typeof createdDate === "string")
        setCommentRelativeTime(dayjs(createdDate).fromNow());
      else {
        setCommentRelativeTime(createdDate.fromNow());
      }
    }
  }

  // if (!refreshIntevel) {
  //   setRefreshInterval(
  //     setInterval(() => {
  //       updateCommentRelativeTime();
  //     }, 1000 * 5)
  //   );
  // }
  return (
    <>
      <div className="comment-bubble">
        <div className="d-flex gap-4" style={{ fontWeight: "bold" }}>
          <div>{createdBy.name}</div>
          {decode_jwt.sub === createdBy.username ? (
            <>
              {" "}
              <div
                onClick={() => emitEditComment(id)}
                style={{ cursor: "pointer", color: "blue" }}
              >
                Edit
              </div>
              <div
                onClick={() => emitDeleteComment(id)}
                style={{ cursor: "pointer", color: "red" }}
              >
                Delete
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div>{text}</div>
      </div>
      <div
        style={{ marginTop: "-1.25em", marginLeft: "2em", fontSize: "12px" }}
      >
        {commentRelativeTime ? `Posted ${commentRelativeTime}` : ""}
      </div>
    </>
  );
};

export default Comment;
