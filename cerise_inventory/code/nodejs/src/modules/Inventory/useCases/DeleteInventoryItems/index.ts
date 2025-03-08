import { getPrisma } from "../../../../db/prisma";
import InventoryItemsRepository from "../../../../modules/Inventory/repositories/InventoryItemsRepository";
import DeleteInventoryItemsController from "./DeleteInventoryItemsController";
import DeleteInventoryItemsUseCase from "./DeleteInventoryItemsUseCase";

export default async function DeleteInventoryItems() {
  const prisma = await getPrisma();

  const inventoryItemsRepository = new InventoryItemsRepository(prisma);

  const deleteInventoryItemsUseCase = new DeleteInventoryItemsUseCase(
    inventoryItemsRepository,
  );
  const deleteInventoryItemsController = new DeleteInventoryItemsController(
    deleteInventoryItemsUseCase,
  );

  return { deleteInventoryItemsUseCase, deleteInventoryItemsController };
}
