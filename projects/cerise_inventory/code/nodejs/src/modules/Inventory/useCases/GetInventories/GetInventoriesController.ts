import { NextFunction, Request, Response } from "express";
import GetInventoriesUseCase from "./GetInventoriesUseCase";

export default class GetInventoriesController {
  constructor(private getInventoriesUseCase: GetInventoriesUseCase) {
    this.getInventoriesUseCase = getInventoriesUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const inventories = await this.getInventoriesUseCase.execute();

      return response.status(200).json(inventories);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
