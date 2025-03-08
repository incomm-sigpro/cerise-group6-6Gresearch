import { getPrisma } from "../../../../db/prisma";
import InventoryItemsRepository from "../../../../modules/Inventory/repositories/InventoryItemsRepository";
import GetInventoryItemsController from "./GetInventoryItemsController";
import GetInventoryItemsUseCase from "./GetInventoryItemsUseCase";

export default async function GetInventoryItems() {
  const prisma = await getPrisma();

  const inventoryItemsRepository = new InventoryItemsRepository(prisma);

  const getInventoryItemsUseCase = new GetInventoryItemsUseCase(
    inventoryItemsRepository,
  );
  const getInventoryItemsController = new GetInventoryItemsController(
    getInventoryItemsUseCase,
  );

  return { getInventoryItemsUseCase, getInventoryItemsController };
}
