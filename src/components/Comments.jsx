import { useState, useEffect } from "react";

import CommentCard from "./CommentCard";
import PostComment from "./PostComment";

import { getComments } from "../api/comments";

function Comments({ article_id }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments(article_id).then((res) => {
      setComments(res);
    });
  }, []);

  return (
    <section>
      <PostComment />
      {comments.map((comment) => {
        return <CommentCard key={comment.comment_id} comment={comment} />;
      })}
    </section>
  );
}

export default Comments;
