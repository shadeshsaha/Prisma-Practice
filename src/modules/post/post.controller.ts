import { Request, Response } from "express";
import { PostService } from "./post.service";

const createPostController = async (req: Request, res: Response) => {
  try {
    const result = await PostService.cratePost(req.body);
    res.send({
      success: true,
      message: "Post Created Successfully!",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getAllPostController = async (req: Request, res: Response) => {
  try {
    const result = await PostService.getAllPost();
    res.send({
      success: true,
      message: "Post fetched Successfully!",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getSinglePostController = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const result = await PostService.getSinglePost(id);

    res.status(200).json({
      success: true,
      message: "Single Post retrived successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const PostController = {
  createPostController,
  getAllPostController,
  getSinglePostController,
};
