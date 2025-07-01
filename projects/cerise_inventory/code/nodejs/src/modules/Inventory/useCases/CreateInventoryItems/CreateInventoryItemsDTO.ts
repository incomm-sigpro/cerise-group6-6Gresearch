import { Scope, Category, Inventory } from "@prisma/client";

export type CreateInventoryItemsDTO = {
  scope: Scope;
  uf: string;
  description: string;
  category?: Category;
  categoryId: string;
  quantity?: any;
  inventory?: Inventory;
  inventoryId: string;
  createdBy: string;
};
