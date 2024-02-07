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
          display: "flex",
          alignContent: "center",
          border: "1px solid black",
          borderRadius: "20px",
          width: "100%",
          marginBottom: "1rem",
          marginTop: "1rem",
          backgroundColor: "white",
        }}
      >
        <TopicsLinks title={title} setTitle={setTitle} />

        <Link
          to="/home"
          onClick={() => {
            setTitle("Topics");
          }}
          style={{ marginInline: "70px" }}
        >
          <h1>nc newsit</h1>
        </Link>
      </div>
    </>
  );
}

export default Header;
