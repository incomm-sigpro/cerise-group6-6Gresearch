import CreateUserCorporation from "../modules/Inventory/useCases/CreateUserCorporation";
import GetUserCorporation from "../modules/Inventory/useCases/GetUserCorporation";
import UpdateUserCorporation from "../modules/Inventory/useCases/UpdateUserCorporation";
import DeleteUserCorporation from "../modules/Inventory/useCases/DeleteUserCorporation";
import { Router } from "express";
import passport from "passport";

const userCorporationRouter = Router({ mergeParams: true });

userCorporationRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { createUserCorporationController } = await CreateUserCorporation();
      return createUserCorporationController.handle(request, response, next);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Erro ao criar empresa de usuário" });
    }
  },
);

userCorporationRouter.get(
  "/:userCorporationId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { getUserCorporationController } = await GetUserCorporation();
      return getUserCorporationController.handle(request, response, next);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Erro ao buscar empresa de usuário" });
    }
  },
);

userCorporationRouter.put(
  "/:userCorporationId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { updateUserCorporationController } = await UpdateUserCorporation();
      return updateUserCorporationController.handle(request, response, next);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Erro ao atualizar empresa de usuário." });
    }
  },
);

userCorporationRouter.delete(
  "/:userCorporationId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { deleteUserCorporationController } = await DeleteUserCorporation();
      return deleteUserCorporationController.handle(request, response, next);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Erro ao deletar empresa de usuário." });
    }
  },
);

export default userCorporationRouter;
