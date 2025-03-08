import { getPrisma } from "../../../../db/prisma";
import SourceRepository from "../../../../modules/Inventory/repositories/SourceRepository";
import GetSourcesController from "./GetSourcesController";
import GetSourcesUseCase from "./GetSourcesUseCase";

export default async function GetSources() {
  const prisma = await getPrisma();

  const sourceRepository = new SourceRepository(prisma);

  const getSourcesUseCase = new GetSourcesUseCase(sourceRepository);
  const getSourcesController = new GetSourcesController(getSourcesUseCase);

  return { getSourcesUseCase, getSourcesController };
}
