import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserContext from "./context/UserContext";
import "./App.css";
import Header from "./components/Header";
import User from "./components/User";
import Footer from "./components/Footer";
import ArticlesManager from "./components/ArticlesManager";
import Article from "./components/Article";
import PostArticle from "./components/PostArticle";

function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    username: "Default User",
    name: "Anon",
    avatar_url: "https://static.thenounproject.com/png/5034901-200.png",
  });

  return (
    <>
      <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
        <Header />
        <Routes>
          <Route path="/home" element={<ArticlesManager />} />
          <Route path="/articles/:topic" element={<ArticlesManager />} />
          <Route path="/article/:article_id" element={<Article />} />
          <Route path="/postarticle" element={<PostArticle />} />
          <Route path="/user/:username" element={<User />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;
