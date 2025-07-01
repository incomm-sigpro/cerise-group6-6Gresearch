import { Inventory } from "@prisma/client";
import { IInventoryRepository } from "../../../../modules/Inventory/repositories/interfaces/IInventoryRepository";
import ValidationException from "../../../../exceptions/ValidationException";
import { HttpExceptionEnum } from "../../../../exceptions";

export default class UpdateInventoryUseCase {
  private inventoryRepository: IInventoryRepository;

  constructor(inventoryRepository: IInventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }

  async execute(inventoryId: string, updatedInventoryData: Partial<Inventory>) {
    const existingInventory =
      await this.inventoryRepository.getById(inventoryId);

    if (!existingInventory) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Inventário não encontrado.`,
        },
        404,
      );
    }

    if (updatedInventoryData.deletedBy) {
      const updatedInventory = await this.inventoryRepository.update(
        inventoryId,
        updatedInventoryData,
      );

      await this.inventoryRepository.updateCascade(
        inventoryId,
        updatedInventoryData,
      );

      return updatedInventory;
    } else {
      const updatedInventory = await this.inventoryRepository.update(
        inventoryId,
        updatedInventoryData,
      );

      return updatedInventory;
    }
  }
}
