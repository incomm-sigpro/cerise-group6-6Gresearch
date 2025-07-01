import { getPrisma } from "../../../../db/prisma";
import InventoryRepository from "../../repositories/InventoryRepository";
import CreateInventoryController from "./CreateInventoryController";
import CreateInventoryUseCase from "./CreateInventoryUseCase";

export default async function CreateInventory() {
  const prisma = await getPrisma();

  const inventoryRepository = new InventoryRepository(prisma);

  const createInventoryUseCase = new CreateInventoryUseCase(
    inventoryRepository,
  );
  const createInventoryController = new CreateInventoryController(
    createInventoryUseCase,
  );

  return { createInventoryUseCase, createInventoryController };
}
