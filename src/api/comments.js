import axios from "axios";

function getComments(id) {
  return axios
    .get(`https://hollycr-nc-news.onrender.com/api/articles/${id}/comments`)
    .then(({ data }) => {
      const { comments } = data;
      return comments;
    })
    .catch((err) => {});
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
  return axios
    .delete(`https://hollycr-nc-news.onrender.com/api/comments/${comment_id}`)
    .catch((err) => {});
}

function patchComment(id, votes) {
  return axios
    .patch(`https://hollycr-nc-news.onrender.com/api/comments/${id}`, {
      inc_votes: votes,
    })
    .then(({ data }) => {
      const { comment } = data;
      return comment;
    });
}

export { getComments, postComment, deleteComment, patchComment };
