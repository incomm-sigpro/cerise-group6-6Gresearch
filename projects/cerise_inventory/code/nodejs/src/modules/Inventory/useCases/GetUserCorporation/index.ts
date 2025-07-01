import { getPrisma } from "../../../../db/prisma";
import UserCorporationRepository from "../../../../modules/Inventory/repositories/UserCorporationRepository";
import GetUserCorporationController from "./GetUserCorporationController";
import GetUserCorporationUseCase from "./GetUserCorporationUseCase";

export default async function GetUserCorporation() {
  const prisma = await getPrisma();

  const userCorporationRepository = new UserCorporationRepository(prisma);

  const getUserCorporationUseCase = new GetUserCorporationUseCase(
    userCorporationRepository,
  );
  const getUserCorporationController = new GetUserCorporationController(
    getUserCorporationUseCase,
  );

  return { getUserCorporationUseCase, getUserCorporationController };
}
