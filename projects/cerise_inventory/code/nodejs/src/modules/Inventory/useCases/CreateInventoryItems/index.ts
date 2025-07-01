import { getPrisma } from "../../../../db/prisma";
import InventoryItemsRepository from "../../repositories/InventoryItemsRepository";
import CreateInventoryItemsController from "./CreateInventoryItemsController";
import CreateInventoryItemsUseCase from "./CreateInventoryItemsUseCase";

export default async function CreateInventoryItems() {
  const prisma = await getPrisma();

  const inventoryItemsRepository = new InventoryItemsRepository(prisma);

  const createInventoryItemsUseCase = new CreateInventoryItemsUseCase(
    inventoryItemsRepository,
  );
  const createInventoryItemsController = new CreateInventoryItemsController(
    createInventoryItemsUseCase,
  );

  return { createInventoryItemsUseCase, createInventoryItemsController };
}
