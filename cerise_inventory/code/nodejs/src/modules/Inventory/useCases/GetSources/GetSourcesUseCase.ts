import { ISourceRepository } from "../../../../modules/Inventory/repositories/interfaces/ISourceRepository";

export default class GetSourcesUseCase {
  private sourceRepository: ISourceRepository;

  constructor(sourceRepository: ISourceRepository) {
    this.sourceRepository = sourceRepository;
  }

  async execute() {
    return this.sourceRepository.getAllSources();
  }
}
