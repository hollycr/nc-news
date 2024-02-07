import { useContext, useState } from "react";
import UserContext from "../context/UserContext";

import { deleteComment } from "../api/comments";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function CommentCard({ comment, setCommentsChange }) {
  const { loggedInUser } = useContext(UserContext);
  const [deleteMsg, setDeleteMsg] = useState("");

  function handleDelete(event) {
    deleteComment(event.target.value).then(() => {
      setDeleteMsg("deleted!");
      setCommentsChange(true);
    });
    setCommentsChange(false);
  }

  return (
    <Card variant="outlined" style={{ margin: "0.5rem" }}>
      <h5 style={{ textAlign: "left", marginLeft: "1rem" }}>
        {comment.author}
      </h5>
      <p style={{ padding: "1rem" }}>{comment.body}</p>
      <div style={{ display: "inline-flex", alignItems: "center" }}>
        <p style={{ marginRight: "10px" }}>votes: {comment.votes} </p>
        {comment.author === loggedInUser.username ? (
          <button
            value={comment.comment_id}
            style={{ backgroundColor: "#e4e4e4" }}
            onClick={handleDelete}
          >
            delete comment
          </button>
        ) : null}
      </div>
      <p>{deleteMsg}</p>
    </Card>
  );
}

export default CommentCard;
