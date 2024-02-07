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
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
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
                  <ListItemText primary={topic.slug} />
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
      <Button
        onClick={toggleDrawer(true)}
        style={{ color: "#fa2020", padding: "30px" }}
      >
        <h2>{title}</h2>
      </Button>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer(false)}
        onClick={toggleDrawer(false)}
      >
        {list()}
      </Drawer>
    </>
  );
}

export default TopicsLinks;