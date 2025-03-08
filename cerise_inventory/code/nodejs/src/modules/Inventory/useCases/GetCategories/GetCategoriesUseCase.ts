import { ICategoryRepository } from "../../../../modules/Inventory/repositories/interfaces/ICategoryRepository";

export default class GetCategoriesUseCase {
  private categoryRepository: ICategoryRepository;

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute() {
    return this.categoryRepository.getAllCategories();
  }
}
