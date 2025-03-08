import { getPrisma } from "../../../../db/prisma";
import CorporationRepository from "../../../../modules/Inventory/repositories/CorporationRepository";
import DeleteCorporationController from "./DeleteCorporationController";
import DeleteCorporationUseCase from "./DeleteCorporationUseCase";

export default async function DeleteCorporation() {
  const prisma = await getPrisma();

  const corporationRepository = new CorporationRepository(prisma);

  const deleteCorporationUseCase = new DeleteCorporationUseCase(
    corporationRepository,
  );
  const deleteCorporationController = new DeleteCorporationController(
    deleteCorporationUseCase,
  );

  return { deleteCorporationUseCase, deleteCorporationController };
}
