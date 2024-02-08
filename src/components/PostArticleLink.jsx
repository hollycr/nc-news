import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

function PostArticleLink() {
  return (
    <Link to="/postarticle">
      <Box
        sx={{
          background: "white",
        }}
      >
        <TextField fullWidth label="Create a post" id="create-a-post" />
      </Box>
    </Link>
  );
}

export default PostArticleLink;
