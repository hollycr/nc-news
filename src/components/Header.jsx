import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import TopicsLinks from "./TopicsLinks";
import LoggedInAs from "./LoggedInAs";
import UserContext from "../context/UserContext";

function Header() {
  const [title, setTitle] = useState("Topics");
  const { loggedInUser } = useContext(UserContext);

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
        {/* <Link style={{ color: "black" }} to={`/user/${loggedInUser.username}`}> */}
        <LoggedInAs />
        {/* </Link> */}
      </header>
    </>
  );
}

export default Header;
