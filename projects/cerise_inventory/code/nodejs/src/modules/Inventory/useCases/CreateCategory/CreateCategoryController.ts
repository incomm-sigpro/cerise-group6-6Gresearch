import { NextFunction, Request, Response } from "express"
import { CreateCategoryDTO } from "./CreateCategoryDTO";
import CreateCategoryUseCase from "./CreateCategoryUseCase";

export default class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {
    this.createCategoryUseCase = createCategoryUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        id,
        name,
        description,
        scope,
        inventoryItems,
      } = request.body as CreateCategoryDTO;

      const category = await this.createCategoryUseCase.execute({
        id,
        name,
        description,
        scope,
        inventoryItems,
      });

      return response.status(201).json(category);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
