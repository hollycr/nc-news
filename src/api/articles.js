import axios from "axios";

function getArticles(topic) {
  let queryStr = "https://hollycr-nc-news.onrender.com/api/articles";
  if (topic) queryStr += `?topic=${topic}`;

  return axios.get(queryStr).then(({ data }) => {
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

function patchArticle(id, votes) {
  return axios
    .patch(`https://hollycr-nc-news.onrender.com/api/articles/${id}`, {
      inc_votes: votes,
    })
    .then(({ data }) => {
      const { article } = data;
      return article;
    });
}

export { getArticles, getSingleArticle, patchArticle };
