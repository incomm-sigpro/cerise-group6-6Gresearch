import { Source } from "@prisma/client";
import { ISourceRepository } from "../../../../modules/Inventory/repositories/interfaces/ISourceRepository";

export default class UpdateSourceUseCase {
  private sourceRepository: ISourceRepository;

  constructor(sourceRepository: ISourceRepository) {
    this.sourceRepository = sourceRepository;
  }

  async execute(sourceId: string, updatedSourceData: Partial<Source>) {
    const existingSource = await this.sourceRepository.getById(sourceId);

    if (!existingSource) {
      throw new Error("Categoria não encontrada");
    }

    const updatedSource = await this.sourceRepository.update(
      sourceId,
      updatedSourceData,
    );

    return updatedSource;
  }
}
