import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  Card,
  Chip,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  CardHeader,
  Avatar,
} from "@mui/material";

import { red } from "@mui/material/colors";

import noImage from "../images/noImage.svg";

const Post = ({ _id, content, title, subtitle, image, tag, createdAt }) => {
  const convertRelativeTime = (date) => {
    return moment(date).fromNow();
  };
  return (
    <div>
      <Card sx={{ maxWidth: 345, maxHeight: 750 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="blog-author">
              R
            </Avatar>
          }
          title={title}
          subheader={convertRelativeTime(createdAt)}
        />
        <CardMedia component="img" src={image || noImage} alt="image" />
        <CardContent>
          <Typography variant="body2" component="p">
            {subtitle}
          </Typography>
          <Typography variant="body2" component="p">
            {content?.substring(0, 250) + "..."}
          </Typography>
          <Chip label={` # ${tag}`} variant="outlined" />
          <CardActions>
            <Button size="small">
              <Link to={`/posts/${_id}`}>More</Link>
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
};

export default Post;
