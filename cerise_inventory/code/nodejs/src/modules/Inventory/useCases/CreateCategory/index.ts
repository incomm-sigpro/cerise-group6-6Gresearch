import { getPrisma } from "../../../../db/prisma";
import CategoryRepository from "../../repositories/CategoryRepository";
import CreateCategoryController from "./CreateCategoryController";
import CreateCategoryUseCase from "./CreateCategoryUseCase";

export default async function CreateCategory() {
  const prisma = await getPrisma();

  const categoryRepository = new CategoryRepository(prisma);

  const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
  const createCategoryController = new CreateCategoryController(
    createCategoryUseCase,
  );

  return { createCategoryUseCase, createCategoryController };
}
