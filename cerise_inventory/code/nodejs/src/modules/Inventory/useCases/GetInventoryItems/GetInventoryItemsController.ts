import { NextFunction, Request, Response } from "express";
import GetInventoryItemsUseCase from "./GetInventoryItemsUseCase";

export default class GetInventoryItemsController {
  constructor(private getInventoryItemsUseCase: GetInventoryItemsUseCase) {
    this.getInventoryItemsUseCase = getInventoryItemsUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { inventoryId } = request.params;
      const inventoryItems = await this.getInventoryItemsUseCase.execute(inventoryId);

      return response.status(200).json(inventoryItems);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
