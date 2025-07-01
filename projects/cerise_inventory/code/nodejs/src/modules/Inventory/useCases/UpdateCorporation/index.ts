import { getPrisma } from "../../../../db/prisma";
import CorporationRepository from "../../../../modules/Inventory/repositories/CorporationRepository";
import UpdateCorporationController from "./UpdateCorporationController";
import UpdateCorporationUseCase from "./UpdateCorporationUseCase";

export default async function UpdateCorporation() {
  const prisma = await getPrisma();

  const corporationRepository = new CorporationRepository(prisma);

  const updateCorporationUseCase = new UpdateCorporationUseCase(
    corporationRepository,
  );
  const updateCorporationController = new UpdateCorporationController(
    updateCorporationUseCase,
  );

  return { updateCorporationUseCase, updateCorporationController };
}
