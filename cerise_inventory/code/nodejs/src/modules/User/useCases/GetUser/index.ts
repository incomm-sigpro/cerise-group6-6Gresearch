import { getPrisma } from "../../../../db/prisma";
import UserRepository from "../../../../modules/User/repositories/UserRepository";
import GetUserController from "./GetUserController";
import GetUserUseCase from "./GetUserUseCase";

export default async function GetUser() {
  const prisma = await getPrisma();

  const userRepository = new UserRepository(prisma);

  const getUserUseCase = new GetUserUseCase(userRepository);
  const getUserController = new GetUserController(getUserUseCase);

  return { getUserUseCase, getUserController };
}
