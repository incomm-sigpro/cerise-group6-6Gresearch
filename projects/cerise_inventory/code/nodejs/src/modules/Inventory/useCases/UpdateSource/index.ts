import { getPrisma } from "../../../../db/prisma";
import SourceRepository from "../../../../modules/Inventory/repositories/SourceRepository";
import UpdateSourceController from "./UpdateSourceController";
import UpdateSourceUseCase from "./UpdateSourceUseCase";

export default async function UpdateSource() {
  const prisma = await getPrisma();

  const sourceRepository = new SourceRepository(prisma);

  const updateSourceUseCase = new UpdateSourceUseCase(sourceRepository);
  const updateSourceController = new UpdateSourceController(
    updateSourceUseCase,
  );

  return { updateSourceUseCase, updateSourceController };
}
