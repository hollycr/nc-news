import { useContext } from "react";
import UserContext from "../context/UserContext";

function LoggedInAs() {
  const { loggedInUser } = useContext(UserContext);
  return (
    <>
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
      <img
        className="avatar-img"
        src={loggedInUser.avatar_url}
        alt={`avatar image for ${loggedInUser.username}`}
      />
    </>
  );
}

export default LoggedInAs;
