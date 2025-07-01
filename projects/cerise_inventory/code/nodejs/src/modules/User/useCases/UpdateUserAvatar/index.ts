import { getPrisma } from "../../../../db/prisma";
import UserRepository from "../../../../modules/User/repositories/UserRepository";
import UpdateUserAvatarController from "./UpdateUserAvatarController";
import UpdateUserAvatarUseCase from "./UpdateUserAvatarUseCase";

export default async function UpdateUserAvatar() {
  const prisma = await getPrisma();

  const userRepository = new UserRepository(prisma);

  const updateUserAvatarUseCase = new UpdateUserAvatarUseCase(userRepository);
  const updateUserAvatarController = new UpdateUserAvatarController(
    updateUserAvatarUseCase,
  );

  return { updateUserAvatarUseCase, updateUserAvatarController };
}
