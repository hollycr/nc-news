import { useParams } from "react-router-dom";

import Article from "./Article";
import Comments from "./Comments";

function SingleArticleManager() {
  const { article_id } = useParams();

  return (
    <main>
      <Article article_id={article_id} />
      <Comments article_id={article_id} />
    </main>
  );
}

export default SingleArticleManager;
