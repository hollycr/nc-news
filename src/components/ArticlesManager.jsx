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
  let [searchParams, setSearchParams] = useState({ sortBy: "", orderBy: "" });
  //const [sortBy, setSortBy] = useState({ sortBy: "", orderBy: "" });

  useEffect(() => {
    getArticles(topic, searchParams).then((res) => {
      setArticles(res);
      setIsLoading(false);
    });
  }, [topic, searchParams]);

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
