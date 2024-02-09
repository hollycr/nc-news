import { useState, useEffect } from "react";

import CommentCard from "./CommentCard";
import PostComment from "./PostComment";

import { getComments } from "../api/comments";

function Comments(props) {
  const { comments, displayedCommentNum, setDisplayedCommentNum, article_id } =
    props;
  // const [comments, setComments] = useState([]);

  // useEffect(() => {
  //   getComments(article_id).then((res) => {
  //     setComments(res);
  //   });
  // }, [displayedCommentNum]);

  return (
    <section>
      <PostComment
        setDisplayedCommentNum={setDisplayedCommentNum}
        article_id={article_id}
      />
      {comments.map((comment) => {
        return (
          <CommentCard
            key={comment.comment_id}
            comment={comment}
            setDisplayedCommentNum={setDisplayedCommentNum}
          />
        );
      })}
    </section>
  );
}

export default Comments;
