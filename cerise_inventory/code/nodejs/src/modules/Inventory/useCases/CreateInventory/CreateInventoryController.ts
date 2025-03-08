import { NextFunction, Request, Response } from "express";
import { CreateInventoryDTO } from "./CreateInventoryDTO";
import CreateInventoryUseCase from "./CreateInventoryUseCase";

export default class CreateInventoryController {
  constructor(private createInventoryUseCase: CreateInventoryUseCase) {
    this.createInventoryUseCase = createInventoryUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { userId, year, corporationId, name, status, createdBy } =
        request.body as CreateInventoryDTO;

      const inventory = await this.createInventoryUseCase.execute({
        userId,
        year,
        corporationId,
        name,
        status,
        createdBy,
      });

      return response.status(201).json(inventory);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
