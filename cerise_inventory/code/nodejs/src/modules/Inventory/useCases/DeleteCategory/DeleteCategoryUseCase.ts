import { HttpExceptionEnum } from "../../../../exceptions";
import ValidationException from "../../../../exceptions/ValidationException";
import { ICategoryRepository } from "../../../../modules/Inventory/repositories/interfaces/ICategoryRepository";

export default class DeleteCategoryUseCase {
  private categoryRepository: ICategoryRepository;

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(categoryId: string) {
    const categoryToDelete = await this.categoryRepository.getById(categoryId);

    if (!categoryToDelete) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Categoria não encontrada.`,
        },
        404,
      );
    }

    await this.categoryRepository.delete(categoryId);

    return "Categoria excluída com sucesso";
  }
}
