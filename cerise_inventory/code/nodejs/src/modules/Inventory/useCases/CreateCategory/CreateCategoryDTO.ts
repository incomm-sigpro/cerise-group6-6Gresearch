import { InventoryItems, Scope } from "@prisma/client";

export type CreateCategoryDTO = {
  id: string;
  name: string;
  description: string;
  scope: Scope;
  inventoryItems?: InventoryItems[];
}