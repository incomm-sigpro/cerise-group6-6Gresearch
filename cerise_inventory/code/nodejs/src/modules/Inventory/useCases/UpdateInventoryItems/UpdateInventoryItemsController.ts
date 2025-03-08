import { NextFunction, Request, Response } from "express";
import UpdateInventoryItemsUseCase from "./UpdateInventoryItemsUseCase";

export default class UpdateInventoryItemsController {
  constructor(private updateInventoryItemsUseCase: UpdateInventoryItemsUseCase) {
    this.updateInventoryItemsUseCase = updateInventoryItemsUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { inventoryItemsId } = request.params;
      const newData = request.body;

      const inventoryItems = await this.updateInventoryItemsUseCase.execute(inventoryItemsId, newData);

      return response.status(200).json(inventoryItems);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
