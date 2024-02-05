import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function CommentCard({ comment }) {
  return (
    <Card variant="outlined">
      <h5>{comment.author}</h5>
      <p>{comment.body}</p>
      <p>votes: {comment.votes}</p>
    </Card>
  );
}

export default CommentCard;
