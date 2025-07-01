import CreateCategory from "../modules/Inventory/useCases/CreateCategory";
import GetCategory from "../modules/Inventory/useCases/GetCategory";
import GetCategories from "../modules/Inventory/useCases/GetCategories";
import UpdateCategory from "../modules/Inventory/useCases/UpdateCategory";
import DeleteCategory from "../modules/Inventory/useCases/DeleteCategory";
import { Router } from "express";
import passport from "passport";

const categoryRouter = Router({ mergeParams: true });

categoryRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { createCategoryController } = await CreateCategory();
      return createCategoryController.handle(request, response, next);
    } catch (error) {
      return response.status(400).json({ message: "Erro ao criar categoria" });
    }
  },
);

categoryRouter.get(
  "/:categoryId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { getCategoryController } = await GetCategory();
      return getCategoryController.handle(request, response, next);
    } catch (error) {
      return response.status(400).json({ message: "Erro ao buscar categoria" });
    }
  },
);

categoryRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { getCategoriesController } = await GetCategories();
      return getCategoriesController.handle(request, response, next);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Erro ao buscar categorias" });
    }
  },
);

categoryRouter.put(
  "/:categoryId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { updateCategoryController } = await UpdateCategory();
      return updateCategoryController.handle(request, response, next);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Erro ao atualizar categoria." });
    }
  },
);

categoryRouter.delete(
  "/:categoryId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { deleteCategoryController } = await DeleteCategory();
      return deleteCategoryController.handle(request, response, next);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao deletar categoria." });
    }
  },
);

export default categoryRouter;
