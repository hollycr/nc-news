import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import ArticlesList from "./ArticlesList";
import PostArticle from "./PostArticle";
import SortArticles from "./SortArticles";

import { getArticles } from "../api/articles";

function ArticlesManager() {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");

  useEffect(() => {
    getArticles(topic, sortByQuery, orderQuery).then((res) => {
      setArticles(res);
      setIsLoading(false);
    });
  }, [sortByQuery, orderQuery]);

  return (
    <>
      <PostArticle />
      <SortArticles
        setSearchParams={setSearchParams}
        searchParams={searchParams}
      />
      {isLoading ? (
        <p>Just fetching some articles for you..</p>
      ) : (
        <ArticlesList articles={articles} />
      )}
    </>
  );
}

export default ArticlesManager;
