import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Grid, IconButton } from "@mui/material";
import Post from "./Post";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";

const PostsList = () => {
  const posts = useSelector((state) => state.posts.posts);
  const [layout, setLayout] = useState("gridThree");
  const calculateLayout = () => {
    return layout === "gridThree" ? 4 : 3;
  };
  return (
    <>
      <div>
        <IconButton onClick={() => setLayout("gridThree")}>
          <CalendarViewMonthIcon
            sx={{ background: layout === "gridThree" ? "#ccc" : "" }}
          />
        </IconButton>
        <IconButton onClick={() => setLayout("gridFour")}>
          <ViewCompactIcon
            sx={{ background: layout === "gridFour" ? "#ccc" : "" }}
          />
        </IconButton>
      </div>
      <Grid container spacing={2} alignContent="stretch">
        {posts.length > 0 &&
          posts.map((post) => (
            <Grid item key={post?._id} xs={12} md={calculateLayout()}>
              <Post {...post} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default PostsList;
