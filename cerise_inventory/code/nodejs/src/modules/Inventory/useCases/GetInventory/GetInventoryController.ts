import { NextFunction, Request, Response } from "express";
import GetInventoryUseCase from "./GetInventoryUseCase";

export default class GetInventoryController {
  constructor(private getInventoryUseCase: GetInventoryUseCase) {
    this.getInventoryUseCase = getInventoryUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { inventoryId } = request.params;
      const inventory = await this.getInventoryUseCase.execute(inventoryId);

      return response.status(200).json(inventory);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
