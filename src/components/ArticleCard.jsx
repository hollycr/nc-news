import Card from "@mui/material/Card";

import { format } from "date-fns";

function ArticleCard({ article }) {
  return (
    <>
      <Card
        style={{
          border: "3px solid grey",
          borderRadius: "20px",
          marginLeft: "5vw",
          marginBottom: "1vw",
          width: "90vw",
        }}
        variant="outlined"
      >
        <p
          style={{
            fontSize: "13px",
            textAlign: "left",
            marginLeft: "10px",
          }}
        >
          Posted to{" "}
          <span style={{ fontWeight: "bold" }}>
            {article.topic.toUpperCase()}
          </span>{" "}
          by {article.author} on{" "}
          {format(new Date(`${article.created_at}`), "p dd/MM/yyyy")}
        </p>

        <h3 style={{ marginLeft: "1rem", marginRight: "1rem", padding: "0" }}>
          {article.title}
        </h3>
        <p
          style={{
            fontSize: "13px",
            textAlign: "right",
            marginRight: "10px",
          }}
        >
          Votes: {article.votes} Comments: {article.comment_count}
        </p>
      </Card>
    </>
  );
}

export default ArticleCard;
