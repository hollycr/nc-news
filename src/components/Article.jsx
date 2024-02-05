import { getSingleArticle } from "../api/articles";
import { useEffect, useState } from "react";

import Card from "@mui/material/Card";

function Article({ article_id }) {
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSingleArticle(article_id).then((res) => {
      setArticle(res);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p>Just loading your article...</p>;
  }

  return (
    <Card variant="outlined">
      <article>
        <h2>{article.title}</h2>
        <h3>{article.author}</h3>
        <p>{article.body}</p>
        <div>
          <p>
            votes: {article.votes} comments:{article.comment_count}
          </p>
        </div>
      </article>
    </Card>
  );
}

export default Article;
