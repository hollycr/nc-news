import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { postComment } from "../api/comments";

function PostComment({ article_id, setCommentsChange }) {
  const { loggedInUser } = useContext(UserContext);
  const [userInput, setUserInput] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  function handlePostComment(event) {
    event.preventDefault();
    postComment(article_id, {
      username: loggedInUser.username,
      body: userInput,
    })
      .then((res) => {
        setFeedbackMsg("Comment posted!");
        setCommentsChange(true);
      })
      .catch((err) => {
        setFeedbackMsg("Oops! Couldn't post your comment. Try again later!");
      });
    setUserInput("");
  }

  function handleInput(event) {
    setUserInput(event.target.value);
  }
  return (
    <form onSubmit={handlePostComment}>
      <label htmlFor="new-comment">Add a comment:</label>
      <div>
        <input
          style={{
            width: "300px",
            height: "100px",
            textAlign: "center",
            border: "1px solid black",
          }}
          onChange={handleInput}
          value={userInput}
          id="new-comment"
          placeholder="What do you think?"
          type="text"
          required
        />
      </div>
      <button style={{ backgroundColor: "#eea0a2" }}>Comment</button>
      <p>{feedbackMsg}</p>
    </form>
  );
}

export default PostComment;
