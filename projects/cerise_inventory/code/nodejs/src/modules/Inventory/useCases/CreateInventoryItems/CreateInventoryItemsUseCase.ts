import { IInventoryItemsRepository } from "../../repositories/interfaces/IInventoryItemsRepository";
import { CreateInventoryItemsDTO } from "./CreateInventoryItemsDTO";

export default class CreateInventoryItemsUseCase {
  constructor(private inventoryItemsRepository: IInventoryItemsRepository) {}

  async execute(data: CreateInventoryItemsDTO) {
    return this.inventoryItemsRepository.create(data);
  }
}