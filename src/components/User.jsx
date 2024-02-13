import { getUsers } from "../api/users";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import UserCard from "./UserCard";

function User() {
  const [users, setUsers] = useState([]);
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  return (
    <>
      <p>You are currently logged in as {loggedInUser.username}.</p>
      {users.map((user) => {
        return <UserCard user={user} key={user.username} />;
      })}
    </>
  );
}

export default User;
