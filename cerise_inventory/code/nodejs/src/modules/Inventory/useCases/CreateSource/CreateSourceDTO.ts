import { InventoryItems, Scope } from "@prisma/client";

export type CreateSourceDTO = {
  name: string;
  description: string;
  scope: Scope;
  categoryId: string;
  measurementUnit: string;
  inventoryItems?: InventoryItems[];
}