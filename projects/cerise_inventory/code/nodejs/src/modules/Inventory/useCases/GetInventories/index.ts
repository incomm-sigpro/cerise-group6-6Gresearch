import { getPrisma } from "../../../../db/prisma";
import InventoryRepository from "../../../../modules/Inventory/repositories/InventoryRepository";
import GetInventoriesController from "./GetInventoriesController";
import GetInventoriesUseCase from "./GetInventoriesUseCase";

export default async function GetInventories() {
  const prisma = await getPrisma();

  const inventoryRepository = new InventoryRepository(prisma);

  const getInventoriesUseCase = new GetInventoriesUseCase(inventoryRepository);
  const getInventoriesController = new GetInventoriesController(
    getInventoriesUseCase,
  );

  return { getInventoriesUseCase, getInventoriesController };
}
