import Card from "@mui/material/Card";

import { format } from "date-fns";

function ArticleCard({ article }) {
  return (
    <>
      <Card variant="outlined">
        <p style={{ fontSize: "13px", textAlign: "left", marginLeft: "10px" }}>
          {format(new Date(`${article.created_at}`), "p dd/MM/yyyy")}
        </p>
        <h3>{article.title}</h3>
        <h4>{article.author}</h4>

        <p>
          Votes: {article.votes} Comments: {article.comment_count}
        </p>
      </Card>
    </>
  );
}

export default ArticleCard;
