import { useContext, useState } from "react";
import UserContext from "../context/UserContext";

import { deleteComment } from "../api/comments";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function CommentCard({ comment, setCommentsChange }) {
  const { loggedInUser } = useContext(UserContext);
  const [commentId, setCommentId] = useState(null);

  function handleDelete(event) {
    deleteComment(event.target.value).then(() => {
      setCommentsChange(true);
    });
    setCommentsChange(false);
  }

  return (
    <Card variant="outlined">
      <h5>{comment.author}</h5>
      <p>{comment.body}</p>
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
    </Card>
  );
}

export default CommentCard;
