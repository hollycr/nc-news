import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import ArticlesList from "./ArticlesList";
import PostArticle from "./PostArticle";
import SortArticles from "./SortArticles";

import { getArticles } from "../api/articles";

function ArticlesManager() {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [loadingMsg, setLoadingMsg] = useState({
    text: "Just fetching some articles for you..",
    style: {
      border: "2px solid #fc9d92",
      padding: "40px",
      backgroundColor: "#faeae8",
    },
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const sortByQuery = searchParams.get("sort_by");
  const orderQuery = searchParams.get("order");

  useEffect(() => {
    getArticles(topic, sortByQuery, orderQuery)
      .then((res) => {
        setArticles(res);
        setLoadingMsg({ text: "" });
      })
      .catch((err) => {
        console.log(err, "<< err in am useEffect");
        setLoadingMsg({
          text: "Uh oh! Couldn't find that topic.. maybe hit home, let's find something that does exist 👀",
          style: {
            border: "2px solid red",
            padding: "40px",
            backgroundColor: "#fcd4d5",
          },
        });
      });
  }, [topic, sortByQuery, orderQuery]);

  return (
    <>
      <PostArticle />
      <SortArticles
        setSearchParams={setSearchParams}
        searchParams={searchParams}
      />
      {loadingMsg.text ? (
        <p style={loadingMsg.style}>{loadingMsg.text}</p>
      ) : (
        <ArticlesList articles={articles} />
      )}
    </>
  );
}

export default ArticlesManager;
