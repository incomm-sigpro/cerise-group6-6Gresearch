import { ICategoryRepository } from "../../repositories/interfaces/ICategoryRepository";
import { CreateCategoryDTO } from "./CreateCategoryDTO";

export default class CreateCategoryUseCase {
  private categoryRepository: ICategoryRepository;

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute({
    id,
    name,
    description,
    scope,
    inventoryItems,
  }: CreateCategoryDTO) {
    return this.categoryRepository.create({
      id,
      name,
      description,
      scope,
      inventoryItems,
    });
  }
}