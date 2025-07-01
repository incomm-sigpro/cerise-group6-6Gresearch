import CreateAddress from "../modules/Inventory/useCases/CreateAddress";
import GetAddress from "../modules/Inventory/useCases/GetAddress";
import UpdateAddress from "../modules/Inventory/useCases/UpdateAddress";
import DeleteAddress from "../modules/Inventory/useCases/DeleteAddress";
import { Router } from "express";
import passport from "passport";

const addressRouter = Router({ mergeParams: true });

addressRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { createAddressController } = await CreateAddress();
      return createAddressController.handle(request, response, next);
    } catch (error) {
      return response.status(400).json({ message: "Erro ao criar enderaço" });
    }
  },
);

addressRouter.get(
  "/:addressId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { getAddressController } = await GetAddress();
      return getAddressController.handle(request, response, next);
    } catch (error) {
      return response.status(400).json({ message: "Erro ao buscar endereço" });
    }
  },
);

addressRouter.put(
  "/:addressId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { updateAddressController } = await UpdateAddress();
      return updateAddressController.handle(request, response, next);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Erro ao atualizar endereço." });
    }
  },
);

addressRouter.delete(
  "/:addressId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { deleteAddressController } = await DeleteAddress();
      return deleteAddressController.handle(request, response, next);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao deletar endereço." });
    }
  },
);

export default addressRouter;
