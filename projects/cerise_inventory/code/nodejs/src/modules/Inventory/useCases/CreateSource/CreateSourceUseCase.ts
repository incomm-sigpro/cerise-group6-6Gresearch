import { ISourceRepository } from "../../repositories/interfaces/ISourceRepository";
import { CreateSourceDTO } from "./CreateSourceDTO";

export default class CreateSourceUseCase {
  private sourceRepository: ISourceRepository;

  constructor(sourceRepository: ISourceRepository) {
    this.sourceRepository = sourceRepository;
  }

  async execute({
    name,
    description,
    scope,
    categoryId,
    measurementUnit,
    inventoryItems,
  }: CreateSourceDTO) {
    return this.sourceRepository.create({
      name,
      description,
      scope,
      categoryId,
      measurementUnit,
      inventoryItems,
    });
  }
}