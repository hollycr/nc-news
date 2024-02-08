import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import ArticlesList from "./ArticlesList";
import PostArticleLink from "./PostArticleLink";
import SortArticles from "./SortArticles";

import Pagination from "@mui/material/Pagination";

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

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  function changePage(event) {
    console.dir(event.target.dataset.testid, "<< event target");
    if (event.target.firstChild.data) {
      const pg = Number(event.target.firstChild.data);
      setPage(pg);
    } else {
      if (event.target.dataset.testid === "NavigateNextIcon") {
        setPage((currentPage) => (currentPage += 1));
      } else {
        setPage((currentPage) => (currentPage -= 1));
      }
    }
  }

  useEffect(() => {});

  useEffect(() => {
    getArticles(topic, sortByQuery, orderQuery, page)
      .then((data) => {
        const { articles, total_count } = data;
        setArticles(articles);
        setTotalPages(Math.ceil(total_count / 10));
        setLoadingMsg({ text: "" });
      })
      .catch((err) => {
        setLoadingMsg({
          text: "Uh oh! Couldn't find that topic.. maybe hit home, let's find something that does exist 👀",
          style: {
            border: "2px solid red",
            padding: "40px",
            backgroundColor: "#fcd4d5",
          },
        });
      });
  }, [topic, sortByQuery, orderQuery, page]);

  return (
    <>
      <PostArticleLink />
      <SortArticles
        setSearchParams={setSearchParams}
        searchParams={searchParams}
      />
      {loadingMsg.text ? (
        <p style={loadingMsg.style}>{loadingMsg.text}</p>
      ) : (
        <>
          <p
            style={{
              color: "#616060",
              fontSize: "12px",
              textAlign: "left",
              marginLeft: "10px",
            }}
          >
            You're viewing page {page} of {totalPages} on {topic} posts.
          </p>
          <ArticlesList articles={articles} />
          <Pagination count={totalPages} onClick={changePage} />
        </>
      )}
    </>
  );
}

export default ArticlesManager;
