import { NextFunction, Request, Response } from "express";
import GetCategoriesUseCase from "./GetCategoriesUseCase";

export default class GetCategoriesController {
  constructor(private getCategoriesUseCase: GetCategoriesUseCase) {
    this.getCategoriesUseCase = getCategoriesUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const categories = await this.getCategoriesUseCase.execute();

      return response.status(200).json(categories);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
