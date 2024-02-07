import { getSingleArticle } from "../api/articles";
import Comments from "./Comments";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Card from "@mui/joy/Card";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import { patchArticle } from "../api/articles";

function Article() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [displayedVotes, setDisplayedVotes] = useState(5);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [commentErrMsg, setCommentErrMsg] = useState("");

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

  function vote(votes) {
    setButtonDisabled(true);
    patchArticle(article_id, votes)
      .then((res) => {
        setDisplayedVotes((current) => (current += votes));
      })
      .catch((err) => {
        setCommentErrMsg(
          "Something went wrong - couldn't vote! Come back later."
        );
      });
  }

  if (loadingMsg.text) {
    return <p style={loadingMsg.style}>{loadingMsg.text}</p>;
  }
  return (
    <>
      <Card variant="soft">
        <article>
          <h2>{article.title}</h2>
          <h3>{article.author}</h3>
          {article.article_img_url ? (
            <img
              src={`${article.article_img_url}`}
              alt={`image for ${article.title}`}
            />
          ) : null}
          <p>{article.body}</p>
          <div>
            <p>
              votes: {displayedVotes} comments: {article.comment_count}
            </p>
            <button
              aria-label="upvote by one"
              onClick={() => vote(1)}
              disabled={isButtonDisabled}
            >
              <ThumbUpIcon />
            </button>
            <button
              aria-label="downvote by one"
              onClick={() => vote(-1)}
              disabled={isButtonDisabled}
            >
              <ThumbDownIcon />
            </button>
          </div>
          <p>{commentErrMsg}</p>
        </article>
      </Card>
      <Comments article_id={article_id} />
    </>
  );
}

export default Article;
