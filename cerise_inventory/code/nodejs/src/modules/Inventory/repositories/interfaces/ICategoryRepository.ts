import { Category } from "@prisma/client";
import { CreateCategoryDTO } from "../../useCases/CreateCategory/CreateCategoryDTO";

export interface ICategoryRepository {
  create(category: CreateCategoryDTO): Promise<Category>;
  getById(categoryId: string): Promise<Category | null>;
  getAllCategories(): Promise<Category[] | null>;
  update(categoryId: string, updatedCategoryData: Partial<Category>): Promise<Category>;
  delete(categoryId: string): Promise<Category>;
}
