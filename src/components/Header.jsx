import { Link } from "react-router-dom";
import { useState } from "react";
import TopicsLinks from "./TopicsLinks";
import { Divider } from "@mui/material";

function Header() {
  const [title, setTitle] = useState("Topics");

  return (
    <>
      <header>
        <TopicsLinks title={title} setTitle={setTitle} />
        <Link
          to="/home"
          onClick={() => {
            setTitle("Topics");
          }}
        >
          <h1 style={{ display: "flex" }}>NC NEWSIT</h1>
        </Link>
      </header>

      {/* <TopicsLinks title={title} setTitle={setTitle} /> */}
    </>
  );
}

export default Header;
