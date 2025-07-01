import { IInventoryItemsRepository } from "../../../../modules/Inventory/repositories/interfaces/IInventoryItemsRepository";

export default class GetInventoryItemsUseCase {
  private inventoryItemsRepository: IInventoryItemsRepository;

  constructor(inventoryItemsRepository: IInventoryItemsRepository) {
    this.inventoryItemsRepository = inventoryItemsRepository;
  }

  async execute(inventoryItemsId: string) {
    return this.inventoryItemsRepository.getByInventoryId(inventoryItemsId);
  }
}
