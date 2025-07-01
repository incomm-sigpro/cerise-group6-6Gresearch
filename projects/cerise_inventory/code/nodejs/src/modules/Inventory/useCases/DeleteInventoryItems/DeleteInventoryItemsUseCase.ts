import { HttpExceptionEnum } from "../../../../exceptions";
import ValidationException from "../../../../exceptions/ValidationException";
import { IInventoryItemsRepository } from "../../../../modules/Inventory/repositories/interfaces/IInventoryItemsRepository";

export default class DeleteInventoryItemsUseCase {
  private inventoryItemsRepository: IInventoryItemsRepository;

  constructor(inventoryItemsRepository: IInventoryItemsRepository) {
    this.inventoryItemsRepository = inventoryItemsRepository;
  }

  async execute(inventoryItemsId: string) {
    const inventoryItemsToDelete =
      await this.inventoryItemsRepository.getById(inventoryItemsId);

    if (!inventoryItemsToDelete) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Item de inventário não encontrado.`,
        },
        404,
      );
    }

    await this.inventoryItemsRepository.delete(inventoryItemsId);

    return "Item de inventário excluído com sucesso!";
  }
}
