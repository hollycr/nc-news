import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { getTopics } from "../api/topics";
import { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import { postArticle } from "../api/articles";

function PostArticle() {
  const { loggedInUser } = useContext(UserContext);
  const [topics, setTopics] = useState([]);
  const [newArticle, setNewArticle] = useState({
    author: loggedInUser.username,
    title: "",
    body: "",
    topic: "",
    article_img_url: "",
  });
  const [confirmationMsg, setConfirmationMsg] = useState("");
  useEffect(() => {
    getTopics().then((res) => setTopics(res));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    console.log("clicked");

    postArticle(newArticle).then((article) => {
      console.log("posted!", article);
      setNewArticle({
        author: loggedInUser.username,
        title: "",
        body: "",
        topic: "",
        article_img_url: "",
      });
      setConfirmationMsg(article.article_id);
    });
  }

  return (
    <>
      <div id="post-article-form">
        <h2 style={{ textAlign: "left" }}>Create a post</h2>

        <form onSubmit={handleSubmit}>
          <InputLabel htmlFor={"topic-select"} id="topic-label">
            Choose a topic:
          </InputLabel>
          <Select
            fullWidth
            style={{
              backgroundColor: "white",
              textAlign: "left",
            }}
            labelId="topic-label"
            id="topic-select"
            value={newArticle.topic}
            inputProps={{ id: "topic-select" }}
            required
          >
            {topics.map((topic) => (
              <MenuItem
                key={topic.slug}
                value={topic.slug}
                onClick={(event) => {
                  setNewArticle({
                    author: newArticle.author,
                    title: newArticle.title,
                    body: newArticle.body,
                    topic: event.target.textContent,
                    article_img_url: newArticle.article_img_url,
                  });
                }}
                style={{ textAlign: "left" }}
              >
                {topic.slug}
              </MenuItem>
            ))}
          </Select>

          <div className="form-title">
            <label htmlFor="new-post-title">Title*: </label>
            <input
              style={{
                padding: "7px",
                minWidth: "55vw",
                maxWidth: "80vw",
                margin: "10px",
              }}
              id="new-post-title"
              type="text"
              value={newArticle.title}
              onChange={(event) => {
                setNewArticle({
                  author: newArticle.author,
                  title: event.target.value,
                  body: newArticle.body,
                  topic: newArticle.topic,
                  article_img_url: newArticle.article_img_url,
                });
              }}
              required
            ></input>
          </div>

          <div id="post-form-body">
            <label htmlFor="new-post-body">Body*: </label>
            <Box
              sx={{
                "& .MuiTextField-root": {
                  m: 1,
                  width: "65vw",
                  backgroundColor: "white",
                },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="new-post-body"
                multiline
                rows={4}
                value={newArticle.body}
                onChange={(event) => {
                  setNewArticle({
                    author: newArticle.author,
                    title: newArticle.title,
                    body: event.target.value,
                    topic: newArticle.topic,
                    article_img_url: newArticle.article_img_url,
                  });
                }}
                required
              />
            </Box>
          </div>

          <div className="form-title">
            <label htmlFor="new-post-img">Image URL (optional): </label>
            <input
              style={{
                padding: "7px",
                minWidth: "55vw",
                maxWidth: "80vw",
                margin: "10px",
              }}
              id="new-post-img"
              type="text"
              value={newArticle.article_img_url}
              onChange={(event) => {
                setNewArticle({
                  author: newArticle.author,
                  title: newArticle.title,
                  body: newArticle.body,
                  topic: newArticle.topic,
                  article_img_url: event.target.value,
                });
              }}
            ></input>
          </div>
          <button> Post</button>
        </form>
        {confirmationMsg ? (
          <>
            <p>
              Successfully posted! If you like, you can go and{" "}
              <a
                style={{ color: "blue", textDecoration: "underline" }}
                href={`/article/${confirmationMsg}`}
              >
                view your article
              </a>
              .
            </p>
          </>
        ) : null}
      </div>
    </>
  );
}

export default PostArticle;
