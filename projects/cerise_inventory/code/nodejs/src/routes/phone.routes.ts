import CreatePhone from "../modules/User/useCases/CreatePhone";
import GetPhone from "../modules/User/useCases/GetPhone";
import GetPhones from "../modules/User/useCases/GetPhones";
import UpdatePhone from "../modules/User/useCases/UpdatePhone";
import DeletePhone from "../modules/User/useCases/DeletePhone";
import { Router } from "express";
import passport from "passport";

const phoneRouter = Router({ mergeParams: true });

phoneRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    const { createPhoneController } = await CreatePhone();
    return createPhoneController.handle(request, response, next);
  },
);

phoneRouter.get(
  "/:phoneId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { getPhoneController } = await GetPhone();
      return getPhoneController.handle(request, response, next);
    } catch (error) {
      return response.status(400).json({ message: "Erro ao buscar telefone" });
    }
  },
);

phoneRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { getPhonesController } = await GetPhones();
      return getPhonesController.handle(request, response, next);
    } catch (error) {
      return response.status(400).json({ message: "Erro ao buscar telefone" });
    }
  },
);

phoneRouter.put(
  "/:phoneId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { updatePhoneController } = await UpdatePhone();
      return updatePhoneController.handle(request, response, next);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Erro ao atualizar telefone." });
    }
  },
);

phoneRouter.delete(
  "/:phoneId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { deletePhoneController } = await DeletePhone();
      return deletePhoneController.handle(request, response, next);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao deletar telefone." });
    }
  },
);

export default phoneRouter;
