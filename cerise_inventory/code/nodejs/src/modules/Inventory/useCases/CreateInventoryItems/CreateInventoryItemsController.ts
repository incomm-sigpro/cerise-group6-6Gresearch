import { NextFunction, Request, Response } from "express";
import { CreateInventoryItemsDTO } from "./CreateInventoryItemsDTO";
import CreateInventoryItemsUseCase from "./CreateInventoryItemsUseCase";

export default class CreateInventoryItemsController {
  constructor(
    private createInventoryItemsUseCase: CreateInventoryItemsUseCase,
  ) {
    this.createInventoryItemsUseCase = createInventoryItemsUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        scope,
        uf,
        description,
        categoryId,
        sourceId,
        quantity,
        quantityJan,
        quantityFeb,
        quantityMar,
        quantityApr,
        quantityMay,
        quantityJun,
        quantityJul,
        quantityAug,
        quantitySep,
        quantityOct,
        quantityNov,
        quantityDec,
        passenger,
        segment,
        emissions,
        total_CO2e,
        inventory,
        inventoryId,
        createdBy,
      } = request.body as CreateInventoryItemsDTO;

      const inventoryItems = await this.createInventoryItemsUseCase.execute({
        scope,
        uf,
        description,
        categoryId,
        sourceId,
        quantity,
        quantityJan,
        quantityFeb,
        quantityMar,
        quantityApr,
        quantityMay,
        quantityJun,
        quantityJul,
        quantityAug,
        quantitySep,
        quantityOct,
        quantityNov,
        quantityDec,
        passenger,
        segment,
        emissions,
        total_CO2e,
        inventory,
        inventoryId,
        createdBy,
      });

      return response.status(201).json(inventoryItems);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
