import { getPrisma } from "../../../../db/prisma";
import UserRepository from "../../../../modules/User/repositories/UserRepository";
import GetUsersController from "./GetUsersController";
import GetUsersUseCase from "./GetUsersUseCase";

export default async function GetUsers() {
  const prisma = await getPrisma();

  const userRepository = new UserRepository(prisma);

  const getUsersUseCase = new GetUsersUseCase(userRepository);
  const getUsersController = new GetUsersController(getUsersUseCase);

  return { getUsersUseCase, getUsersController };
}
