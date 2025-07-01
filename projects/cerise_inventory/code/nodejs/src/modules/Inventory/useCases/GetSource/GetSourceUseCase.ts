import { ISourceRepository } from "../../../../modules/Inventory/repositories/interfaces/ISourceRepository";

export default class GetSourceUseCase {
  private sourceRepository: ISourceRepository;

  constructor(sourceRepository: ISourceRepository) {
    this.sourceRepository = sourceRepository;
  }

  async execute(sourceId: string) {
    return this.sourceRepository.getById(sourceId);
  }
}
