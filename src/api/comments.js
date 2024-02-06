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
      return comment;
    });
}

function deleteComment(comment_id) {
  return axios.delete(
    `https://hollycr-nc-news.onrender.com/api/comments/${comment_id}`
  );
}

export { getComments, postComment, deleteComment };
