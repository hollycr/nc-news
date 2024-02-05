import { useState, useEffect } from "react";

import ArticlesList from "./ArticlesList";
import PostArticle from "./PostArticle";
import SortArticles from "./SortArticles";

import { getArticles } from "../api/articles";

function ArticlesManager() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then((res) => {
      setArticles(res);
    });
  }, []);

  return (
    <>
      <p>articles manager</p>
      <PostArticle />
      <SortArticles />
      <ArticlesList articles={articles} />
    </>
  );
}

export default ArticlesManager;
