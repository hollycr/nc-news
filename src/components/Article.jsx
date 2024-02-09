import Comments from "./Comments";
import UserContext from "../context/UserContext";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import Card from "@mui/joy/Card";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import { format } from "date-fns";

import { patchArticle, deleteArticle, getSingleArticle } from "../api/articles";

function Article() {
  const { loggedInUser } = useContext(UserContext);
  const { article_id } = useParams();
  const [article, setArticle] = useState({});

  const [displayedVotes, setDisplayedVotes] = useState(0);
  const [displayedCommentNum, setDisplayedCommentNum] = useState(0);

  const [isDownButtonDisabled, setDownButtonDisabled] = useState(false);
  const [isUpButtonDisabled, setUpButtonDisabled] = useState(false);

  const [voteErrMsg, setVoteErrMsg] = useState("");
  const [userVote, setUserVote] = useState(1);
  const [deletedMsg, setDeletedMsg] = useState("");
  const [deleteErrMsg, setDeleteErrMsg] = useState("");

  const [loadingMsg, setLoadingMsg] = useState({
    text: "Just loading your article...",
    style: {
      border: "2px solid #fc9d92",
      padding: "40px",
      backgroundColor: "#faeae8",
    },
  });

  useEffect(() => {
    getSingleArticle(article_id)
      .then((res) => {
        setArticle(res);
        setLoadingMsg({ text: "" });
      })
      .catch((err) => {
        setLoadingMsg({
          text: "Uh oh! Couldn't find that article.. maybe hit home, let's find something that does exist 👀",
          style: {
            border: "2px solid red",
            padding: "40px",
            backgroundColor: "#fcd4d5",
          },
        });
      });
  }, []);

  useEffect(() => {
    setDisplayedVotes(article.votes);
    setDisplayedCommentNum(article.comment_count);
  }, [article]);

  function upVote(votes) {
    setDownButtonDisabled((current) => !current);
    patchArticle(article_id, votes)
      .then((res) => {
        setDisplayedVotes((current) => (current += votes));
        setUserVote((current) => current * -1);
      })
      .catch((err) => {
        setVoteErrMsg("Something went wrong - couldn't vote! Come back later.");
      });
  }

  function downVote(votes) {
    setUpButtonDisabled((current) => !current);
    patchArticle(article_id, votes)
      .then((res) => {
        setDisplayedVotes((current) => (current -= votes));
        setUserVote((current) => current * -1);
      })
      .catch((err) => {
        setVoteErrMsg("Something went wrong - couldn't vote! Come back later.");
      });
  }

  function handleDelete() {
    deleteArticle(article.article_id)
      .then(() => {
        setDeletedMsg("deleted article!");
      })
      .catch(({ response }) => {
        const { data } = response;
        console.log(data.msg);
        setDeleteErrMsg(
          "Oops, something went wrong! Couldn't delete your article."
        );
      });
  }

  if (loadingMsg.text) {
    return <p style={loadingMsg.style}>{loadingMsg.text}</p>;
  }

  if (deletedMsg) {
    return (
      <Card
        variant="outlined"
        style={{ margin: "5vw", backgroundColor: "white" }}
      >
        <p>{deletedMsg}</p>
      </Card>
    );
  }

  return (
    <>
      <Card
        variant="outlined"
        style={{ margin: "5vw", backgroundColor: "white" }}
      >
        <article>
          <p
            style={{
              color: "#616060",
              fontSize: "15px",
              textAlign: "left",
              marginLeft: "10px",
              padding: "0.5rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            Posted by {article.author} on{" "}
            {format(new Date(`${article.created_at}`), "p dd/MM/yyyy")}
            {article.author === loggedInUser.username ? (
              <>
                <button
                  value={article.article_id}
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
                  delete article
                </button>
              </>
            ) : null}
          </p>
          <p>{deleteErrMsg}</p>
          <h2>{article.title}</h2>

          {article.article_img_url ? (
            <img
              src={`${article.article_img_url}`}
              alt={`image for ${article.title}`}
            />
          ) : null}
          <p>{article.body}</p>
          <div>
            <p
              style={{
                color: "#616060",
                textAlign: "left",
                marginLeft: "10px",
              }}
            >
              votes: {displayedVotes} comments: {displayedCommentNum}
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
          <p>{voteErrMsg}</p>
        </article>
      </Card>
      <Comments
        article_id={article_id}
        setDisplayedCommentNum={setDisplayedCommentNum}
        displayedCommentNum={displayedCommentNum}
      />
    </>
  );
}

export default Article;
