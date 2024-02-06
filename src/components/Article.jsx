import { getSingleArticle } from "../api/articles";
import { useEffect, useState } from "react";

import Card from "@mui/joy/Card";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import { patchArticle } from "../api/articles";

function Article({ article_id }) {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [displayedVotes, setDisplayedVotes] = useState(5);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    getSingleArticle(article_id).then((res) => {
      setArticle(res);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    setDisplayedVotes(article.votes);
  }, [article]);

  if (isLoading) {
    return <p>Just loading your article...</p>;
  }

  function vote(votes) {
    setButtonDisabled(true);
    patchArticle(article_id, votes)
      .then((res) => {
        setDisplayedVotes((current) => (current += votes));
      })
      .catch((err) => {
        setErrMsg("Something went wrong - couldn't vote! Come back later.");
      });
  }

  return (
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
        <p>{errMsg}</p>
      </article>
    </Card>
  );
}

export default Article;
