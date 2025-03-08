import { getPrisma } from "../../../../db/prisma";
import UserCorporationRepository from "../../../../modules/Inventory/repositories/UserCorporationRepository";
import DeleteUserCorporationController from "./DeleteUserCorporationController";
import DeleteUserCorporationUseCase from "./DeleteUserCorporationUseCase";

export default async function DeleteUserCorporation() {
  const prisma = await getPrisma();

  const userCorporationRepository = new UserCorporationRepository(prisma);

  const deleteUserCorporationUseCase = new DeleteUserCorporationUseCase(
    userCorporationRepository,
  );
  const deleteUserCorporationController = new DeleteUserCorporationController(
    deleteUserCorporationUseCase,
  );

  return { deleteUserCorporationUseCase, deleteUserCorporationController };
}
