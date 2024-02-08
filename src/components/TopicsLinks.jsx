import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../api/topics";

function TopicsLinks({ title, setTitle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics()
      .then((res) => {
        setTopics(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const toggleDrawer = (open) => (event) => {
    setIsOpen(open);
  };

  const list = () => (
    <Box sx={{ display: "inline-flex", alignItems: "center" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: 130,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 130,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItem>
            <h3> Topics:</h3>{" "}
          </ListItem>
          {topics.map((topic) => (
            <ListItem key={topic.slug} disablePadding>
              <Link to={`/articles/${topic.slug}`}>
                <ListItemButton
                  onClick={() => {
                    setTitle(`Topic: ${topic.slug}`);
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{ fontSize: "20px" }}
                    primary={topic.slug}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          padding: "1rem",
        }}
      >
        <Button
          onClick={toggleDrawer(true)}
          style={{ color: "#fa2020", padding: "0" }}
        >
          <h2 style={{ color: "black", display: "inline-flex" }}>Ξ {title}</h2>
        </Button>
        <Drawer
          open={isOpen}
          onClose={toggleDrawer(false)}
          onClick={toggleDrawer(false)}
        >
          {list()}
        </Drawer>
      </div>
    </>
  );
}

export default TopicsLinks;
