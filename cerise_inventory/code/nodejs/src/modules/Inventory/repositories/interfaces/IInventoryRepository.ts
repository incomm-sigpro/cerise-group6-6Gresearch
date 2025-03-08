import { Inventory } from "@prisma/client";
import { CreateInventoryDTO } from "../../useCases/CreateInventory/CreateInventoryDTO";

export interface IInventoryRepository {
  create(Inventory: CreateInventoryDTO): Promise<Inventory>;
  getById(InventoryId: string): Promise<Inventory | null>;
  getAllInventories(): Promise<Inventory[] | null>;
  getByUserId(userId: string): Promise<Inventory[] | null>;
  update(
    InventoryId: string,
    updatedInventoryData: Partial<Inventory>,
  ): Promise<Inventory>;
  updateCascade(
    InventoryId: string,
    updatedInventoryData: Partial<Inventory>,
  ): Promise<Inventory>;
  delete(InventoryId: string): Promise<Inventory>;
}
