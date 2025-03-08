import { getPrisma } from "../../../../db/prisma";
import InventoryItemsRepository from "../../../../modules/Inventory/repositories/InventoryItemsRepository";
import UpdateInventoryItemsController from "./UpdateInventoryItemsController";
import UpdateInventoryItemsUseCase from "./UpdateInventoryItemsUseCase";

export default async function UpdateInventoryItems() {
  const prisma = await getPrisma();

  const inventoryItemsRepository = new InventoryItemsRepository(prisma);

  const updateInventoryItemsUseCase = new UpdateInventoryItemsUseCase(
    inventoryItemsRepository,
  );
  const updateInventoryItemsController = new UpdateInventoryItemsController(
    updateInventoryItemsUseCase,
  );

  return { updateInventoryItemsUseCase, updateInventoryItemsController };
}
