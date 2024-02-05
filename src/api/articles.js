import axios from "axios";

function getArticles() {
  return axios
    .get("https://hollycr-nc-news.onrender.com/api/articles")
    .then(({ data }) => {
      const { articles } = data;
      return articles;
    });
}

export { getArticles };
