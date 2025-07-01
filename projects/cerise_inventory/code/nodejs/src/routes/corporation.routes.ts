import CreateCorporation from "../modules/Inventory/useCases/CreateCorporation";
import GetCorporation from "../modules/Inventory/useCases/GetCorporation";
import GetCorporations from "../modules/Inventory/useCases/GetCorporations";
import UpdateCorporation from "../modules/Inventory/useCases/UpdateCorporation";
import DeleteCorporation from "../modules/Inventory/useCases/DeleteCorporation";
import { Router } from "express";
import passport from "passport";

const corporationRouter = Router({ mergeParams: true });

corporationRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { createCorporationController } = await CreateCorporation();
      return createCorporationController.handle(request, response, next);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Erro ao criar corporation" });
    }
  },
);

corporationRouter.get(
  "/:corporationId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { getCorporationController } = await GetCorporation();
      return getCorporationController.handle(request, response, next);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Erro ao buscar corporation" });
    }
  },
);

corporationRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { getCorporationsController } = await GetCorporations();
      return getCorporationsController.handle(request, response, next);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Erro ao buscar categorias" });
    }
  },
);

corporationRouter.put(
  "/:corporationId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { updateCorporationController } = await UpdateCorporation();
      return updateCorporationController.handle(request, response, next);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Erro ao atualizar corporation." });
    }
  },
);

corporationRouter.delete(
  "/:corporationId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { deleteCorporationController } = await DeleteCorporation();
      return deleteCorporationController.handle(request, response, next);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Erro ao deletar corporation." });
    }
  },
);

export default corporationRouter;
