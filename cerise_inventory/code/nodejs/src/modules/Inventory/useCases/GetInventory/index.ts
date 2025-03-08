import { getPrisma } from "../../../../db/prisma";
import InventoryRepository from "../../../../modules/Inventory/repositories/InventoryRepository";
import GetInventoryController from "./GetInventoryController";
import GetInventoryUseCase from "./GetInventoryUseCase";

export default async function GetInventory() {
  const prisma = await getPrisma();

  const inventoryRepository = new InventoryRepository(prisma);

  const getInventoryUseCase = new GetInventoryUseCase(inventoryRepository);
  const getInventoryController = new GetInventoryController(
    getInventoryUseCase,
  );

  return { getInventoryUseCase, getInventoryController };
}
