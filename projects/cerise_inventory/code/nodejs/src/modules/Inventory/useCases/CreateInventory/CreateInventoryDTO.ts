import {
  User,
  Corporation,
  inventoryStatus,
  InventoryItems,
} from "@prisma/client";

export type CreateInventoryDTO = {
  user?: User;
  userId: string;
  year: number;
  corporation?: Corporation;
  corporationId: string;
  name: string;
  status: inventoryStatus;
  inventoryItems?: InventoryItems[];
  createdBy: string;
};
