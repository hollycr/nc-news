import { Link } from "react-router-dom";
import { useState } from "react";
import TopicsLinks from "./TopicsLinks";
import { Divider } from "@mui/material";

function Header() {
  const [title, setTitle] = useState("Topics");

  return (
    <>
      <div
        style={{
          display: "flexbox",
          alignContent: "center",
          border: "1px solid black",
          borderRadius: "20px",
          margin: "0.5rem",
          backgroundColor: "white",
          padding: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <Link
          to="/home"
          onClick={() => {
            setTitle("Topics");
          }}
        >
          <h1>nc newsit</h1>
        </Link>
      </div>
      <TopicsLinks title={title} setTitle={setTitle} />
    </>
  );
}

export default Header;
