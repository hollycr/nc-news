import Card from "@mui/material/Card";

function ArticleCard({ article }) {
  return (
    <>
      <Card variant="outlined">
        <h3>{article.title}</h3>
        <h4>{article.author}</h4>

        <p>
          Votes: {article.votes} Comments:{article.comment_count}
        </p>
      </Card>
    </>
  );
}

export default ArticleCard;
