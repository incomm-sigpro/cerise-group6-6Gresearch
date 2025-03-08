import { getPrisma } from "../../../../db/prisma";
import UserCorporationRepository from "../../../../modules/Inventory/repositories/UserCorporationRepository";
import UpdateUserCorporationController from "./UpdateUserCorporationController";
import UpdateUserCorporationUseCase from "./UpdateUserCorporationUseCase";

export default async function UpdateUserCorporation() {
  const prisma = await getPrisma();

  const userCorporationRepository = new UserCorporationRepository(prisma);

  const updateUserCorporationUseCase = new UpdateUserCorporationUseCase(
    userCorporationRepository,
  );
  const updateUserCorporationController = new UpdateUserCorporationController(
    updateUserCorporationUseCase,
  );

  return { updateUserCorporationUseCase, updateUserCorporationController };
}
