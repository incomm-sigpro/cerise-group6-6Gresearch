import { getPrisma } from "../../../../db/prisma";
import UserCorporationRepository from "../../repositories/UserCorporationRepository";
import CreateUserCorporationController from "./CreateUserCorporationController";
import CreateUserCorporationUseCase from "./CreateUserCorporationUseCase";

export default async function CreateUserCorporation() {
  const prisma = await getPrisma();

  const userCorporationRepository = new UserCorporationRepository(prisma);

  const createUserCorporationUseCase = new CreateUserCorporationUseCase(
    userCorporationRepository,
  );
  const createUserCorporationController = new CreateUserCorporationController(
    createUserCorporationUseCase,
  );

  return { createUserCorporationUseCase, createUserCorporationController };
}
