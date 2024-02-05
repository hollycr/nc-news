import ArticleCard from "./ArticleCard";

function ArticlesList({ articles }) {
  return (
    <main>
      {articles.map((article) => {
        return <ArticleCard key={article.title} article={article} />;
      })}
    </main>
  );
}

export default ArticlesList;
