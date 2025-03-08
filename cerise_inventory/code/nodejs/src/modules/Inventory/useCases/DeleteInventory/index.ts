import { getPrisma } from "../../../../db/prisma";
import InventoryRepository from "../../../../modules/Inventory/repositories/InventoryRepository";
import DeleteInventoryController from "./DeleteInventoryController";
import DeleteInventoryUseCase from "./DeleteInventoryUseCase";

export default async function DeleteInventory() {
  const prisma = await getPrisma();

  const inventoryRepository = new InventoryRepository(prisma);

  const deleteInventoryUseCase = new DeleteInventoryUseCase(
    inventoryRepository,
  );
  const deleteInventoryController = new DeleteInventoryController(
    deleteInventoryUseCase,
  );

  return { deleteInventoryUseCase, deleteInventoryController };
}
