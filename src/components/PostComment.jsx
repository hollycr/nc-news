import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { postComment } from "../api/comments";

function PostComment({ article_id, setCommentsChange }) {
  const { loggedInUser } = useContext(UserContext);
  const standardMsg = `Commenting as ${loggedInUser.username}..`;
  const [userInput, setUserInput] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState(standardMsg);

  function handlePostComment(event) {
    event.preventDefault();
    const regex = /[a-z]/i;
    if (!regex.test(userInput)) {
      console.log("in the if");
      setFeedbackMsg("Hmm, that doesn't look like a very helpful comment..");
    } else {
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
      setCommentsChange(false);
    }
  }

  function handleInput(event) {
    setUserInput(event.target.value);
  }
  return (
    <form onSubmit={handlePostComment}>
      <p>{feedbackMsg} </p>
      <label htmlFor="new-comment">Add a comment:</label>
      <div>
        <input
          style={{
            width: "300px",
            height: "100px",
            textAlign: "center",
            border: "1px solid black",
            background: "white",
            color: "black",
          }}
          onChange={handleInput}
          value={userInput}
          id="new-comment"
          placeholder="What do you think?"
          type="text"
          required
        />
      </div>
      <button
        style={{ backgroundColor: "#eea0a2", margin: "0.5rem", color: "black" }}
        onBlur={() => {
          setFeedbackMsg(standardMsg);
        }}
      >
        Comment
      </button>
    </form>
  );
}

export default PostComment;
