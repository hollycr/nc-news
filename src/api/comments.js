import axios from "axios";

function getComments(id) {
  return axios
    .get(`https://hollycr-nc-news.onrender.com/api/articles/${id}/comments`)
    .then(({ data }) => {
      const { comments } = data;
      return comments;
    });
}

export { getComments };
