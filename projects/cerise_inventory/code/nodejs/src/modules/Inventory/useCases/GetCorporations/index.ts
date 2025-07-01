import { getPrisma } from "../../../../db/prisma";
import CorporationRepository from "../../../../modules/Inventory/repositories/CorporationRepository";
import GetCorporationsController from "./GetCorporationsController";
import GetCorporationsUseCase from "./GetCorporationsUseCase";

export default async function GetCorporations() {
  const prisma = await getPrisma();

  const corporationRepository = new CorporationRepository(prisma);

  const getCorporationsUseCase = new GetCorporationsUseCase(
    corporationRepository,
  );
  const getCorporationsController = new GetCorporationsController(
    getCorporationsUseCase,
  );

  return { getCorporationsUseCase, getCorporationsController };
}
