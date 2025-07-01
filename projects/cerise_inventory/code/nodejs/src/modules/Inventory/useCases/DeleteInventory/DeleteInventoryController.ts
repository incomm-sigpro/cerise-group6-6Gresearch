import { NextFunction, Request, Response } from "express";
import DeleteInventoryUseCase from "./DeleteInventoryUseCase";

export default class DeleteInventoryController {
  constructor(private deleteInventoryUseCase: DeleteInventoryUseCase) {
    this.deleteInventoryUseCase = deleteInventoryUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    const { inventoryId } = request.params;

    try {
      const result = await this.deleteInventoryUseCase.execute(inventoryId);
      return response.status(200).json(result);
    } catch (error) {
      console.error([__filename], { error });
      return next("Não foi possível excluir!");
    }
  }
}
