import express from "express";
import { PostController } from "./post.controller";

const router = express.Router();

router.post("/create-post", PostController.createPostController);
router.get("/", PostController.getAllPostController);
router.get("/:id", PostController.getSinglePostController);

export const PostRoutes = router;
