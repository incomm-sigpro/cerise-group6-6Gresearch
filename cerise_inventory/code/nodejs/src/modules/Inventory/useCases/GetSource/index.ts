import { getPrisma } from "../../../../db/prisma";
import SourceRepository from "../../../../modules/Inventory/repositories/SourceRepository";
import GetSourceController from "./GetSourceController";
import GetSourceUseCase from "./GetSourceUseCase";

export default async function GetSource() {
  const prisma = await getPrisma();

  const sourceRepository = new SourceRepository(prisma);

  const getSourceUseCase = new GetSourceUseCase(sourceRepository);
  const getSourceController = new GetSourceController(getSourceUseCase);

  return { getSourceUseCase, getSourceController };
}
