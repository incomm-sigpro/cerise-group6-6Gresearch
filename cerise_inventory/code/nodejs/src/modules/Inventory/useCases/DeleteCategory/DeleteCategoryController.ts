import { NextFunction, Request, Response } from "express";
import DeleteCategoryUseCase from "./DeleteCategoryUseCase";

export default class DeleteCategoryController {
  constructor(private deleteCategoryUseCase: DeleteCategoryUseCase) {
    this.deleteCategoryUseCase = deleteCategoryUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    const { categoryId } = request.params;

    try {
      const result = await this.deleteCategoryUseCase.execute(categoryId);
      return response.status(200).json({ message: result });
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
