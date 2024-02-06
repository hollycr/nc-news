import axios from "axios";

function getComments(id) {
  return axios
    .get(`https://hollycr-nc-news.onrender.com/api/articles/${id}/comments`)
    .then(({ data }) => {
      const { comments } = data;
      return comments;
    });
}

function postComment(id, comment) {
  return axios
    .post(
      `https://hollycr-nc-news.onrender.com/api/articles/${id}/comments`,
      comment
    )
    .then(({ data }) => {
      const { comment } = data;
      console.log(comment, "<< data returned in post axios");
      return comment;
    });
}

export { getComments, postComment };
