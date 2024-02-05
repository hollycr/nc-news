import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import UserContext from "./context/UserContext";
import "./App.css";
import Header from "./components/Header";
import ArticlesManager from "./components/ArticleManager";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    username: "cooljmessy",
    name: "Peter Messy",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/1/1a/MR_MESSY_4A.jpg/revision/latest/scale-to-width-down/250?cb=20170730171002",
  });

  return (
    <>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <Header />
        <Routes>
          <Route path="/" element={<ArticlesManager />} />
          <Route path="/home" element={<ArticlesManager />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;

/*{
"username": "happyamy2016",
"name": "Amy Happy",
"avatar_url": "https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729"
}*/
