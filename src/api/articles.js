import axios from "axios";

function getArticles(topic, sortByQuery, orderQuery, page) {
  const queryStr = "https://hollycr-nc-news.onrender.com/api/articles";
  const params = {
    topic: topic,
    sort_by: sortByQuery,
    order: orderQuery,
    p: page,
  };

  return axios.get(queryStr, { params }).then(({ data }) => {
    const { articles } = data;
    return data;
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
