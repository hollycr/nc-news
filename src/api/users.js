import axios from "axios";

function getUsers() {
  return axios
    .get("https://hollycr-nc-news.onrender.com/api/users")
    .then(({ data }) => {
      const { users } = data;

      return users;
    });
}
export { getUsers };
