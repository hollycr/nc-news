import { useState, useEffect } from "react";

import ArticlesList from "./ArticlesList";
import PostArticle from "./PostArticle";
import SortArticles from "./SortArticles";

import { getArticles } from "../api/articles";

function ArticlesManager() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles().then((res) => {
      setArticles(res);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <PostArticle />
      <SortArticles />
      {isLoading ? (
        <p>Just fetching some articles for you..</p>
      ) : (
        <ArticlesList articles={articles} />
      )}
    </>
  );
}

export default ArticlesManager;
