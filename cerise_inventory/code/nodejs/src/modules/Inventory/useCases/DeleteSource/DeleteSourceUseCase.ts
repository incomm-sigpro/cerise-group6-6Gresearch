import { ISourceRepository } from "../../../../modules/Inventory/repositories/interfaces/ISourceRepository";

export default class DeleteSourceUseCase {
  private sourceRepository: ISourceRepository;

  constructor(sourceRepository: ISourceRepository) {
    this.sourceRepository = sourceRepository;
  }

  async execute(sourceId: string) {
    const sourceToDelete = await this.sourceRepository.getById(sourceId);

    if (!sourceToDelete) {
      throw new Error("Fonte não encontrada");
    }

    await this.sourceRepository.delete(sourceId);

    return "Fonte excluída com sucesso";
  }
}
