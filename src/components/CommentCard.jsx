import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";

import { deleteComment, patchComment } from "../api/comments";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

function CommentCard({ comment, setCommentsChange, setDisplayedCommentNum }) {
  const { loggedInUser } = useContext(UserContext);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [displayedVotes, setDisplayedVotes] = useState(0);
  const [userVote, setUserVote] = useState(1);
  const [isDownButtonDisabled, setDownButtonDisabled] = useState(false);
  const [isUpButtonDisabled, setUpButtonDisabled] = useState(false);

  useEffect(() => {
    setDisplayedVotes(comment.votes);
  }, []);

  function upVote(votes) {
    setDownButtonDisabled((current) => !current);
    patchComment(comment.comment_id, votes)
      .then((res) => {
        setDisplayedVotes((current) => (current += votes));
        setUserVote((current) => current * -1);
      })
      .catch((err) => {
        setFeedbackMsg(
          "Something went wrong - couldn't vote! Come back later."
        );
      });
  }

  function downVote(votes) {
    setUpButtonDisabled((current) => !current);
    patchComment(comment.comment_id, votes)
      .then((res) => {
        setDisplayedVotes((current) => (current -= votes));
        setUserVote((current) => current * -1);
      })
      .catch((err) => {
        setFeedbackMsg(
          "Something went wrong - couldn't vote! Come back later."
        );
      });
  }

  function handleDelete(event) {
    deleteComment(event.target.value)
      .then(() => {
        setFeedbackMsg("deleted!");

        setDisplayedCommentNum((current) => (current -= 1));
      })
      .catch((err) => {
        console.log(err);
        setFeedbackMsg(
          "Oops, something went wrong! Couldn't delete your comment."
        );
      });
  }

  return (
    <Card variant="outlined" style={{ margin: "5vw" }}>
      <h3
        style={{
          textAlign: "left",
          marginLeft: "1rem",
          fontSize: "15px",
          marginBottom: "0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {comment.author}
        {comment.author === loggedInUser.username ? (
          <button
            value={comment.comment_id}
            style={{
              backgroundColor: "#e4e4e4",
              color: "black",
              marginRight: "2vw",
              marginLeft: "2vw",
              padding: "1vw",
              alignContent: "right",
            }}
            onClick={handleDelete}
          >
            delete comment
          </button>
        ) : null}
      </h3>
      <p style={{ padding: "0.5rem", margin: "0" }}>{comment.body}</p>
      <div style={{ display: "inline-flex", alignItems: "center" }}>
        <p style={{ marginRight: "5px", marginLeft: "5px" }}>
          votes: {displayedVotes}{" "}
        </p>
        <button
          id="up"
          aria-label="upvote by one"
          onClick={(event) => upVote(userVote)}
          disabled={isUpButtonDisabled}
        >
          <ThumbUpIcon />
        </button>
        <button
          aria-label="downvote by one"
          onClick={() => downVote(userVote)}
          disabled={isDownButtonDisabled}
        >
          <ThumbDownIcon />
        </button>
      </div>
      <p>{feedbackMsg}</p>
    </Card>
  );
}

export default CommentCard;
