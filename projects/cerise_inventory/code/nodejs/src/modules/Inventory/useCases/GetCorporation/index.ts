import { getPrisma } from "../../../../db/prisma";
import CorporationRepository from "../../../../modules/Inventory/repositories/CorporationRepository";
import GetCorporationController from "./GetCorporationController";
import GetCorporationUseCase from "./GetCorporationUseCase";

export default async function GetCorporation() {
  const prisma = await getPrisma();

  const corporationRepository = new CorporationRepository(prisma);

  const getCorporationUseCase = new GetCorporationUseCase(
    corporationRepository,
  );
  const getCorporationController = new GetCorporationController(
    getCorporationUseCase,
  );

  return { getCorporationUseCase, getCorporationController };
}
