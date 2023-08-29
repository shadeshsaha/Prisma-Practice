import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const insertIntoDB = async (req: Request, res: Response) => {
  try {
    const result = await CategoryService.insertIntoDB(req.body);
    res.send({
      success: true,
      message: "Category Created Successfully!",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const CategoryController = {
  insertIntoDB,
};
