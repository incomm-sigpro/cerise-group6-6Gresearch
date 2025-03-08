import { getPrisma } from "../../../../db/prisma";
import CorporationRepository from "../../repositories/CorporationRepository";
import CreateCorporationController from "./CreateCorporationController";
import CreateCorporationUseCase from "./CreateCorporationUseCase";

export default async function CreateCorporation() {
  const prisma = await getPrisma();

  const corporationRepository = new CorporationRepository(prisma);

  const createCorporationUseCase = new CreateCorporationUseCase(
    corporationRepository,
  );
  const createCorporationController = new CreateCorporationController(
    createCorporationUseCase,
  );

  return { createCorporationUseCase, createCorporationController };
}
