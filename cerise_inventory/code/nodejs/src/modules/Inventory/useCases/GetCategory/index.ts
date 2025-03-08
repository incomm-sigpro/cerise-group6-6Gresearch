import { getPrisma } from "../../../../db/prisma";
import CategoryRepository from "../../../../modules/Inventory/repositories/CategoryRepository";
import GetCategoryController from "./GetCategoryController";
import GetCategoryUseCase from "./GetCategoryUseCase";

export default async function GetCategory() {
  const prisma = await getPrisma();

  const categoryRepository = new CategoryRepository(prisma);

  const getCategoryUseCase = new GetCategoryUseCase(categoryRepository);
  const getCategoryController = new GetCategoryController(getCategoryUseCase);

  return { getCategoryUseCase, getCategoryController };
}
