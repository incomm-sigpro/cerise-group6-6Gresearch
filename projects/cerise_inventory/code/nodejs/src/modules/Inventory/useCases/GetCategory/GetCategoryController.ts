import { NextFunction, Request, Response } from "express";
import GetCategoryUseCase from "./GetCategoryUseCase";

export default class GetCategoryController {
  constructor(private getCategoryUseCase: GetCategoryUseCase) {
    this.getCategoryUseCase = getCategoryUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { categoryId } = request.params;
      const category = await this.getCategoryUseCase.execute(categoryId);

      return response.status(200).json(category);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
