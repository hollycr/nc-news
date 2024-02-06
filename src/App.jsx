import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserContext from "./context/UserContext";
import "./App.css";
import Header from "./components/Header";
import ArticlesManager from "./components/ArticlesManager";
import SingleArticleManager from "./components/SingleArticleManager";

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
          <Route path="/home" element={<ArticlesManager />} />
          <Route path="/articles/:topic" element={<ArticlesManager />} />
          <Route
            path="/article/:article_id"
            element={<SingleArticleManager />}
          />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
