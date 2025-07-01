import { getPrisma } from "../../../../db/prisma";
import SourceRepository from "../../../../modules/Inventory/repositories/SourceRepository";
import DeleteSourceController from "./DeleteSourceController";
import DeleteSourceUseCase from "./DeleteSourceUseCase";

export default async function DeleteSource() {
  const prisma = await getPrisma();

  const sourceRepository = new SourceRepository(prisma);

  const deleteSourceUseCase = new DeleteSourceUseCase(sourceRepository);
  const deleteSourceController = new DeleteSourceController(
    deleteSourceUseCase,
  );

  return { deleteSourceUseCase, deleteSourceController };
}
