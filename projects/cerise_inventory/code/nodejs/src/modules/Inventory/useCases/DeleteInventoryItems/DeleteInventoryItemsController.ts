import { NextFunction, Request, Response } from "express";
import DeleteInventoryItemsUseCase from "./DeleteInventoryItemsUseCase";

export default class DeleteInventoryItemsController {
  constructor(
    private deleteInventoryItemsUseCase: DeleteInventoryItemsUseCase,
  ) {
    this.deleteInventoryItemsUseCase = deleteInventoryItemsUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    const { inventoryItemsId } = request.params;

    try {
      const result =
        await this.deleteInventoryItemsUseCase.execute(inventoryItemsId);
      return response.status(200).json(result);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
