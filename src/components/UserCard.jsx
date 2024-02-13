import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function UserCard({ user }) {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  function handleLoginChange(event) {
    setLoggedInUser(user);
  }
  return (
    <Card variant="outlined" style={{ margin: "5vw" }}>
      <h3
        style={{
          textAlign: "left",
          marginLeft: "2vw",
          marginRight: "2vw",
          fontSize: "15px",
          marginBottom: "0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img
          className="avatar-img"
          src={user.avatar_url}
          alt={`avatar image for ${user.username}`}
        />
        {user.username} - {user.name}
        {loggedInUser.username !== user.username ? (
          <button
            value={user.username}
            style={{
              backgroundColor: "#e4e4e4",
              color: "black",
              marginRight: "2vw",
              marginLeft: "2vw",
              padding: "1vw",
              alignContent: "right",
            }}
            onClick={handleLoginChange}
          >
            Switch profile
          </button>
        ) : (
          <p
            style={{
              fontWeight: "lighter",
              color: "black",
              marginRight: "2vw",
              marginLeft: "2vw",
              padding: "1vw",
              alignContent: "right",
            }}
          >
            Currently logged in
          </p>
        )}
      </h3>
      <p>{feedbackMsg}</p>
    </Card>
  );
}

export default UserCard;
