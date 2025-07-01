import { IInventoryItemsRepository } from "../../../../modules/Inventory/repositories/interfaces/IInventoryItemsRepository";

export default class UpdateInventoryItemsUseCase {
  private inventoryItemsRepository: IInventoryItemsRepository;

  constructor(inventoryItemsRepository: IInventoryItemsRepository) {
    this.inventoryItemsRepository = inventoryItemsRepository;
  }

  async execute(inventoryItemsId: string, newData: any) {
    return this.inventoryItemsRepository.update(inventoryItemsId, newData);
  }
}
