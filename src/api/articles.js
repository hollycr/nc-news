import axios from "axios";

function getArticles() {
  return axios
    .get("https://hollycr-nc-news.onrender.com/api/articles")
    .then(({ data }) => {
      const { articles } = data;
      return articles;
    });
}

function getSingleArticle(id) {
  return axios
    .get(`https://hollycr-nc-news.onrender.com/api/articles/${id}`)
    .then(({ data }) => {
      const { article } = data;
      return article;
    });
}

export { getArticles, getSingleArticle };
