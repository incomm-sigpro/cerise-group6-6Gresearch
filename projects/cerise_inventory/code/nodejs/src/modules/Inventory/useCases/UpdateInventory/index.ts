import { getPrisma } from "../../../../db/prisma";
import InventoryRepository from "../../../../modules/Inventory/repositories/InventoryRepository";
import UpdateInventoryController from "./UpdateInventoryController";
import UpdateInventoryUseCase from "./UpdateInventoryUseCase";

export default async function UpdateInventory() {
  const prisma = await getPrisma();

  const inventoryRepository = new InventoryRepository(prisma);

  const updateInventoryUseCase = new UpdateInventoryUseCase(
    inventoryRepository,
  );
  const updateInventoryController = new UpdateInventoryController(
    updateInventoryUseCase,
  );

  return { updateInventoryUseCase, updateInventoryController };
}
