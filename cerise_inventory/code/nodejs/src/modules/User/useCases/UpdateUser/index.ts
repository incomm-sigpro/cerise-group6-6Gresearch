import { getPrisma } from "../../../../db/prisma";
import UserRepository from "../../../../modules/User/repositories/UserRepository";
import PhoneRepository from "../../../../modules/User/repositories/PhoneRepository";
import UpdateUserController from "./UpdateUserController";
import UpdateUserUseCase from "./UpdateUserUseCase";

export default async function UpdateUser() {
  const prisma = await getPrisma();

  const userRepository = new UserRepository(prisma);
  const phoneRepository = new PhoneRepository(prisma);

  const updateUserUseCase = new UpdateUserUseCase(
    userRepository,
    phoneRepository,
  );
  const updateUserController = new UpdateUserController(updateUserUseCase);

  return { updateUserUseCase, updateUserController };
}
