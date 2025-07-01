import CreateInventory from "../modules/Inventory/useCases/CreateInventory";
import GetInventories from "../modules/Inventory/useCases/GetInventories";
import GetInventory from "../modules/Inventory/useCases/GetInventory";
import UpdateInventory from "../modules/Inventory/useCases/UpdateInventory";
import DeleteInventory from "../modules/Inventory/useCases/DeleteInventory";
import { Router } from "express";
import passport from "passport";

const inventoryRouter = Router({ mergeParams: true });

inventoryRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { createInventoryController } = await CreateInventory();
      return createInventoryController.handle(request, response, next);
    } catch (error) {
      return response.status(400).json({ message: "Erro ao criar categoria" });
    }
  },
);

inventoryRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { getInventoriesController } = await GetInventories();
      return getInventoriesController.handle(request, response, next);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Erro ao buscar inventários" });
    }
  },
);

inventoryRouter.get(
  "/:inventoryId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { getInventoryController } = await GetInventory();
      return getInventoryController.handle(request, response, next);
    } catch (error) {
      return response.status(400).json({ message: "Erro ao buscar categoria" });
    }
  },
);

inventoryRouter.put(
  "/:inventoryId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { updateInventoryController } = await UpdateInventory();
      return updateInventoryController.handle(request, response, next);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Erro ao atualizar categoria." });
    }
  },
);

inventoryRouter.delete(
  "/:inventoryId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { deleteInventoryController } = await DeleteInventory();
      return deleteInventoryController.handle(request, response, next);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao deletar categoria." });
    }
  },
);

export default inventoryRouter;
