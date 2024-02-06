import axios from "axios";

function getTopics() {
  return axios
    .get("https://hollycr-nc-news.onrender.com/api/topics")
    .then(({ data }) => {
      const { topics } = data;
      return topics;
    });
}

export { getTopics };
