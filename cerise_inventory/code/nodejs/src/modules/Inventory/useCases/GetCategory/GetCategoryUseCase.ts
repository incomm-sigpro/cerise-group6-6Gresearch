import { ICategoryRepository } from "../../../../modules/Inventory/repositories/interfaces/ICategoryRepository";

export default class GetCategoryUseCase {
  private categoryRepository: ICategoryRepository;

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(categoryId: string) {
    return this.categoryRepository.getById(categoryId);
  }
}
