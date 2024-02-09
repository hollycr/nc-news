import { getSingleArticle } from "../api/articles";
import Comments from "./Comments";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Card from "@mui/joy/Card";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import { format } from "date-fns";

import { patchArticle } from "../api/articles";

function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [displayedVotes, setDisplayedVotes] = useState(0);
  const [isDownButtonDisabled, setDownButtonDisabled] = useState(false);
  const [isUpButtonDisabled, setUpButtonDisabled] = useState(false);
  const [voteErrMsg, setVoteErrMsg] = useState("");
  const [userVote, setUserVote] = useState(1);

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

  if (loadingMsg.text) {
    return <p style={loadingMsg.style}>{loadingMsg.text}</p>;
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
            }}
          >
            Posted by {article.author} on{" "}
            {format(new Date(`${article.created_at}`), "p dd/MM/yyyy")}
          </p>
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
              votes: {displayedVotes} comments: {article.comment_count}
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
      <Comments article_id={article_id} />
    </>
  );
}

export default Article;
