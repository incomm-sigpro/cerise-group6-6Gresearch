import { getPrisma } from "../../../../db/prisma";
import CategoryRepository from "../../../../modules/Inventory/repositories/CategoryRepository";
import DeleteCategoryController from "./DeleteCategoryController";
import DeleteCategoryUseCase from "./DeleteCategoryUseCase";

export default async function DeleteCategory() {
  const prisma = await getPrisma();

  const categoryRepository = new CategoryRepository(prisma);

  const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);
  const deleteCategoryController = new DeleteCategoryController(
    deleteCategoryUseCase,
  );

  return { deleteCategoryUseCase, deleteCategoryController };
}
