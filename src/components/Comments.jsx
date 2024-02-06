import { useState, useEffect } from "react";

import CommentCard from "./CommentCard";
import PostComment from "./PostComment";

import { getComments } from "../api/comments";

function Comments({ article_id }) {
  const [comments, setComments] = useState([]);
  const [commentsChange, setCommentsChange] = useState(false);

  useEffect(() => {
    getComments(article_id).then((res) => {
      setComments(res);
    });
  }, [commentsChange]);

  return (
    <section>
      <PostComment
        setCommentsChange={setCommentsChange}
        article_id={article_id}
      />
      {comments.map((comment) => {
        return (
          <CommentCard
            key={comment.comment_id}
            comment={comment}
            setCommentsChange={setCommentsChange}
          />
        );
      })}
    </section>
  );
}

export default Comments;
