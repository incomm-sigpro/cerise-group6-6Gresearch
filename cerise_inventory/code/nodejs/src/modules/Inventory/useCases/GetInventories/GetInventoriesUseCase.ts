import { IInventoryRepository } from "../../../../modules/Inventory/repositories/interfaces/IInventoryRepository";

export default class GetInventoriesUseCase {
  private inventoryRepository: IInventoryRepository;

  constructor(inventoryRepository: IInventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }

  async execute() {
    return this.inventoryRepository.getAllInventories();
  }
}
