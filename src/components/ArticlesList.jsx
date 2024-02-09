import { Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import Pagination from "@mui/material/Pagination";

function ArticlesList({ articles }) {
  return (
    <main>
      {articles.map((article) => {
        return (
          <Link key={article.title} to={`/article/${article.article_id}`}>
            <ArticleCard article={article} />
          </Link>
        );
      })}
    </main>
  );
}

export default ArticlesList;
