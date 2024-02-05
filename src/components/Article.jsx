import { getSingleArticle } from "../api/articles";
import { useEffect, useState } from "react";

import Card from "@mui/joy/Card";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

function Article({ article_id }) {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [displayedVotes, setDisplayedVotes] = useState(5);

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

  function handleUpVote() {
    setDisplayedVotes((current) => (current += 1));
    // patchArticleVotes - make axios function
    // set button as disabled after 1st click? (one vote per user)
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
            votes: {displayedVotes} comments:{article.comment_count}
          </p>
          <button aria-label="upvote by one" onClick={handleUpVote}>
            <ThumbUpIcon />
          </button>
          <button aria-label="downvote by one">
            <ThumbDownIcon />
          </button>
        </div>
      </article>
    </Card>
  );
}

export default Article;
