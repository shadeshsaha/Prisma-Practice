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
  console.log(req.query);
  const options = req.query;
  try {
    const result = await PostService.getAllPost(options);
    res.send({
      success: true,
      message: "Post fetched Successfully!",
      total: result.total,
      data: result.data,
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

const updatePostController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id); // ekhan theke id ta pabo
  const data = req.body; // ekhan theke payload ta pabo
  try {
    const result = await PostService.updatePost(id, data);
    res.status(200).json({
      success: true,
      message: "Post Updated successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const deletePostController = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id); // ekhan theke id ta pabo
  try {
    const result = await PostService.deletePost(id);
    res.status(200).json({
      success: true,
      message: "Post Delete successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const learnAggregateAndGroupingController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await PostService.learnAggregateAndGrouping();
    res.send({
      success: true,
      message: "Result!",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

export const PostController = {
  createPostController,
  getAllPostController,
  getSinglePostController,
  updatePostController,
  deletePostController,
  learnAggregateAndGroupingController,
};
