import { IInventoryRepository } from "../../../../modules/Inventory/repositories/interfaces/IInventoryRepository";

export default class GetInventoryUseCase {
  private inventoryRepository: IInventoryRepository;

  constructor(inventoryRepository: IInventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }

  async execute(inventoryId: string) {
    return this.inventoryRepository.getById(inventoryId);
  }
}
