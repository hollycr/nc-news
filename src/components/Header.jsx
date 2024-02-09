import { Link } from "react-router-dom";
import { useState } from "react";
import TopicsLinks from "./TopicsLinks";
import { Divider } from "@mui/material";
import LoggedInAs from "./LoggedInAs";

function Header() {
  const [title, setTitle] = useState("Topics");

  return (
    <>
      <header>
        <h2>
          <TopicsLinks title={title} setTitle={setTitle} />
        </h2>
        <Link
          to="/home"
          onClick={() => {
            setTitle("Topics");
          }}
        >
          <h1>NC NEWSIT</h1>
        </Link>
        <LoggedInAs />
      </header>

      {/* <TopicsLinks title={title} setTitle={setTitle} /> */}
    </>
  );
}

export default Header;
