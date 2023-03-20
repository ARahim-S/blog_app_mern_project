import express from "express";

import {
  getPosts,
  createPosts,
  getSinglePost,
  deletePost,
  updatePost,
} from "../controllers/postController.js";

const router = express.Router();
//http://localhost:5000/posts
// GET POST DELETE UPDATE PATCH

router.get("/", getPosts);
router.get("/:id", getSinglePost);
router.post("/", createPosts);
router.delete("/:id", deletePost);
router.patch("/:id", updatePost);

export default router;
