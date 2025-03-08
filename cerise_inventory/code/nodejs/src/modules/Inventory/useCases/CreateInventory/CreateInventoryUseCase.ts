import { IInventoryRepository } from "../../repositories/interfaces/IInventoryRepository";
import { CreateInventoryDTO } from "./CreateInventoryDTO";

export default class CreateInventoryUseCase {
  private inventoryRepository: IInventoryRepository;

  constructor(inventoryRepository: IInventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }

  async execute({
    userId,
    year,
    corporationId,
    name,
    status,
    createdBy,
  }: CreateInventoryDTO) {
    const existingInventories: any =
      await this.inventoryRepository.getAllInventories();
    const hasInventoryWithYear = existingInventories.filter(
      (inventory: any) => {
        return (
          inventory.year === Number(year) &&
          inventory.corporationId === corporationId &&
          inventory.isActive
        );
      },
    );

    if (hasInventoryWithYear.length > 0) {
      throw new Error("Inventário já existente");
    }

    return this.inventoryRepository.create({
      userId,
      year,
      corporationId,
      name,
      status,
      createdBy,
    });
  }
}
