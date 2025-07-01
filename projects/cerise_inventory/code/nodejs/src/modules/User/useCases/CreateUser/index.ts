import { getPrisma } from "../../../../db/prisma";
import UserRepository from "../../repositories/UserRepository";
import CreateUserController from "./CreateUserController";
import CreateUserUseCase from "./CreateUserUseCase";

export default async function CreateUser() {
  const prisma = await getPrisma();

  const userRepository = new UserRepository(prisma);

  const createUserUseCase = new CreateUserUseCase(userRepository, prisma);
  const createUserController = new CreateUserController(createUserUseCase);

  return { createUserUseCase, createUserController };
}
