import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts } from "./Redux/actions/postActions";
//
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
//
import {
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Link,
  Grid,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";

import PostsList from "./components/PostsList";
import NotFound from "./components/NotFound";
import AddPostForm from "./components/AddPostForm";
import PostDetails from "./components/PostDetails";

const App = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <AppBar position="static" color="inherit" elevation={0}>
          <Toolbar>
            <IconButton edge="start" color="inherit" />
            <Typography variant="h6" color="secondary" sx={{ flexGrow: "1" }}>
              <Link
                underline="none"
                href="http://localhost:3000/posts"
                color="secondary"
              >
                Blogify
              </Link>
            </Typography>
            <Button
              color="primary"
              variant="outlined"
              onClick={handleOpen}
              startIcon={<CreateIcon />}
            >
              New Article
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Router>
              <Routes>
                <Route exact path="/posts" element={<PostsList />} />
                <Route exact path="/posts/:id" element={<PostDetails />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<Navigate replace to="/posts" />} />
              </Routes>
            </Router>
          </Grid>
        </Grid>
      </Container>
      <AddPostForm open={open} handleClose={handleClose} />
    </>
  );
};

export default App;
