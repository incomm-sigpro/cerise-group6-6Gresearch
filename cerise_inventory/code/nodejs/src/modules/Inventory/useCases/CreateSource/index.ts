import { getPrisma } from "../../../../db/prisma";
import SourceRepository from "../../repositories/SourceRepository";
import CreateSourceController from "./CreateSourceController";
import CreateSourceUseCase from "./CreateSourceUseCase";

export default async function CreateSource() {
  const prisma = await getPrisma();

  const sourceRepository = new SourceRepository(prisma);

  const createSourceUseCase = new CreateSourceUseCase(sourceRepository);
  const createSourceController = new CreateSourceController(
    createSourceUseCase,
  );

  return { createSourceUseCase, createSourceController };
}
