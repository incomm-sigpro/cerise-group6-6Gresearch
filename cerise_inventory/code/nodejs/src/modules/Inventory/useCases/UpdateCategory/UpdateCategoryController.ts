import { NextFunction, Request, Response } from "express";
import UpdateCategoryUseCase from "./UpdateCategoryUseCase";

export default class UpdateCategoryController {
  constructor(private updateCategoryUseCase: UpdateCategoryUseCase) {
    this.updateCategoryUseCase = updateCategoryUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { categoryId } = request.params;
      const newData = request.body;

      const category = await this.updateCategoryUseCase.execute(categoryId, newData);

      return response.status(200).json(category);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
