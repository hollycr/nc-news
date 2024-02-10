import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

function LoggedInAs() {
  const { loggedInUser } = useContext(UserContext);
  return (
    <>
      <Link style={{ color: "black" }} to={`/user/${loggedInUser.username}`}>
        <p
          style={{
            fontSize: "2vw",
            lineHeight: "1",
            display: "block",

            width: "15vw",
            textWrap: "wrap",
          }}
        >
          logged in as:
          <span style={{ display: "block", fontWeight: "bold" }}>
            {loggedInUser.username}{" "}
          </span>
        </p>
      </Link>
      <Link style={{ color: "black" }} to={`/user/${loggedInUser.username}`}>
        <img
          className="avatar-img"
          src={loggedInUser.avatar_url}
          alt={`avatar image for ${loggedInUser.username}`}
        />
      </Link>
    </>
  );
}

export default LoggedInAs;
