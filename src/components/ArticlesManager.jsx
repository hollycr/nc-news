import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ArticlesList from "./ArticlesList";
import PostArticle from "./PostArticle";
import SortArticles from "./SortArticles";

import { getArticles } from "../api/articles";

function ArticlesManager() {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    getArticles(topic, sortBy).then((res) => {
      setArticles(res);
      setIsLoading(false);
    });
  }, [topic, sortBy]);

  return (
    <>
      <PostArticle />
      <SortArticles setSortBy={setSortBy} sortBy={sortBy} />
      {isLoading ? (
        <p>Just fetching some articles for you..</p>
      ) : (
        <ArticlesList articles={articles} />
      )}
    </>
  );
}

export default ArticlesManager;
