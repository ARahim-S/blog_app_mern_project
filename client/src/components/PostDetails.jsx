import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Typography, Paper, Divider, Button, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import noImage from "../images/noImage.svg";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSinglePost, deletePost } from "../Redux/actions/postActions";
import EditPostForm from "./EditPostForm";

const PostDetails = () => {
  const currentPost = useSelector((state) => state.posts.currentPost);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [dispatch, id]);

  const convertRelativeTime = (date) => {
    return moment(date).fromNow();
  };

  const removePost = () => {
    dispatch(deletePost(currentPost._id));
    navigate("/posts");
  };

  const openEditMode = () => {
    setEditMode(true);
  };
  const closeEditMode = () => {
    setEditMode(false);
  };

  return (
    <Paper elevation={0}>
      {editMode ? (
        <EditPostForm post={currentPost} closeEditMode={closeEditMode} />
      ) : (
        <div>
          <div>
            <Typography variant="h5" gutterBottom>
              {currentPost?.title}
            </Typography>
            <div>
              <Button
                color="primary"
                variant="outlined"
                onClick={openEditMode}
                startIcon={<EditIcon />}
              >
                Edit
              </Button>{" "}
              <Button
                color="secondary"
                variant="outlined"
                startIcon={<DeleteIcon />}
                onClick={removePost}
              >
                Delete
              </Button>
            </div>
          </div>

          <Divider />
          <Typography variant="overline" gutterBottom>
            {currentPost?.subtitle}
          </Typography>
          <Typography variant="caption" component="p" gutterBottom>
            {convertRelativeTime(currentPost?.createdAt)} by ARahim
          </Typography>
          <Chip label={`# ${currentPost?.tag}`} variant="outlined" />

          <div>
            <img src={currentPost?.image || noImage} alt="Post" />
            <Typography variant="body1" gutterBottom>
              {currentPost?.content}
            </Typography>
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
