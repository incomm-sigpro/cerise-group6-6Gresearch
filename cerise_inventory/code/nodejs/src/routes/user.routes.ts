import { uploadConfig } from "../config/upload";
import multer from "multer";
// import UserAvatarController from "./userAvatar.controller";

import AuthUser from "../modules/User/useCases/AuthUser";
import CreateUser from "../modules/User/useCases/CreateUser";
import GetUser from "../modules/User/useCases/GetUser";
import GetUsers from "../modules/User/useCases/GetUsers";
import UpdateUser from "../modules/User/useCases/UpdateUser";
import UpdateUserAvatar from "../modules/User/useCases/UpdateUserAvatar";
import DeleteUser from "../modules/User/useCases/DeleteUser";
import { Router } from "express";
import passport from "passport";

const userRouter = Router({ mergeParams: true });
const upload = multer(uploadConfig.MULTER);

userRouter.post("/login", async (request, response, next) => {
  try {
    const { authUserController } = await AuthUser();
    return authUserController.handle(request, response, next);
  } catch (error) {
    return response.status(400).json({ message: "Erro ao autenticar usuário" });
  }
});

userRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { createUserController } = await CreateUser();
      return createUserController.handle(request, response, next);
    } catch (error) {
      return response.status(400).json({ message: "Erro ao criar usuário" });
    }
  },
);

userRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { getUsersController } = await GetUsers();
      return getUsersController.handle(request, response, next);
    } catch (error) {
      return response.status(400).json({ message: "Erro ao buscar usuários" });
    }
  },
);

userRouter.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { getUserController } = await GetUser();
      return getUserController.handle(request, response, next);
    } catch (error) {
      return response.status(400).json({ message: "Erro ao buscar usuário" });
    }
  },
);

userRouter.put(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { updateUserController } = await UpdateUser();
      return updateUserController.handle(request, response, next);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao atualizar usuário." });
    }
  },
);

userRouter.patch(
  "/avatar/:userId",
  passport.authenticate("jwt", { session: false }),
  upload.single("avatar"),
  async (request, response, next) => {
    try {
      const { updateUserAvatarController } = await UpdateUserAvatar();
      return updateUserAvatarController.handle(request, response, next);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao atualizar avatar." });
    }
  },
);

userRouter.delete(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  async (request, response, next) => {
    try {
      const { deleteUserController } = await DeleteUser();
      return deleteUserController.handle(request, response, next);
    } catch (error) {
      return response.status(500).json({ error: "Erro ao deletar usuário." });
    }
  },
);

export default userRouter;
