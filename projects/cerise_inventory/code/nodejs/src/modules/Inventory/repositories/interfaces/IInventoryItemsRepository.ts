import { InventoryItems } from "@prisma/client";
import { CreateInventoryItemsDTO } from "../../useCases/CreateInventoryItems/CreateInventoryItemsDTO";

export interface IInventoryItemsRepository {
  create(InventoryItems: CreateInventoryItemsDTO): Promise<InventoryItems>;
  getById(InventoryItemsId: string): Promise<InventoryItems | null>;
  getByInventoryId(InventoryId: string): Promise<InventoryItems[] | null>;
  update(InventoryItemsId: string, updatedInventoryData: Partial<InventoryItems>): Promise<InventoryItems>;
  delete(InventoryItemsId: string): Promise<InventoryItems>;
}
