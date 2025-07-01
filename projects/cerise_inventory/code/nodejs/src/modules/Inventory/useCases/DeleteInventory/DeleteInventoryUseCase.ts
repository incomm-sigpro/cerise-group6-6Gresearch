import { HttpExceptionEnum } from "../../../../exceptions";
import ValidationException from "../../../../exceptions/ValidationException";
import { IInventoryRepository } from "../../../../modules/Inventory/repositories/interfaces/IInventoryRepository";

export default class DeleteInventoryUseCase {
  private inventoryRepository: IInventoryRepository;

  constructor(inventoryRepository: IInventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }

  async execute(inventoryId: string) {
    const inventoryToDelete =
      await this.inventoryRepository.getById(inventoryId);

    if (!inventoryToDelete) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Inventário não encontrado.`,
        },
        404,
      );
    }

    await this.inventoryRepository.delete(inventoryId);

    return {
      message: "Inventário excluído com sucesso!",
      deletedInventory: inventoryToDelete,
    };
  }
}
