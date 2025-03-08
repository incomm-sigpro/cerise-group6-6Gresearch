import { NextFunction, Request, Response } from "express";
import UpdateInventoryUseCase from "./UpdateInventoryUseCase";

export default class UpdateInventoryController {
  constructor(private updateInventoryUseCase: UpdateInventoryUseCase) {
    this.updateInventoryUseCase = updateInventoryUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { inventoryId } = request.params;
      const newData = request.body;

      const inventory = await this.updateInventoryUseCase.execute(inventoryId, newData);

      return response.status(200).json(inventory);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
