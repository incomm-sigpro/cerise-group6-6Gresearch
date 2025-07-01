import CreateInventoryItems from "../modules/Inventory/useCases/CreateInventoryItems";
import GetInventoryItems from "../modules/Inventory/useCases/GetInventoryItems";
import UpdateInventoryItems from "../modules/Inventory/useCases/UpdateInventoryItems";
import DeleteInventoryItems from "../modules/Inventory/useCases/DeleteInventoryItems";
import { Router } from "express";
import passport from "passport";

const inventoryItemsRouter = Router({ mergeParams: true });

inventoryItemsRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { createInventoryItemsController } = await CreateInventoryItems();
      return createInventoryItemsController.handle(request, response, next);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Erro ao criar item de inventário." });
    }
  },
);

inventoryItemsRouter.get(
  "/:inventoryId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { getInventoryItemsController } = await GetInventoryItems();
      return getInventoryItemsController.handle(request, response, next);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Erro ao buscar item de inventário." });
    }
  },
);

inventoryItemsRouter.put(
  "/:inventoryItemsId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { updateInventoryItemsController } = await UpdateInventoryItems();
      return updateInventoryItemsController.handle(request, response, next);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Erro ao atualizar item de inventário." });
    }
  },
);

inventoryItemsRouter.delete(
  "/:inventoryItemsId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { deleteInventoryItemsController } = await DeleteInventoryItems();
      return deleteInventoryItemsController.handle(request, response, next);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Erro ao deletar item de inventário." });
    }
  },
);

export default inventoryItemsRouter;
