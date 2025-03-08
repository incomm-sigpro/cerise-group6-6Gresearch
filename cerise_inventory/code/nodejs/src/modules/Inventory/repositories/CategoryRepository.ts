import { Category, PrismaClient } from "@prisma/client";
import { CreateCategoryDTO } from "../useCases/CreateCategory/CreateCategoryDTO";
import { ICategoryRepository } from "./interfaces/ICategoryRepository";
import ValidationException from "../../../exceptions/ValidationException";
import { HttpExceptionEnum } from "../../../exceptions";

export default class CategoryRepository implements ICategoryRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create({ id, name, description, scope }: CreateCategoryDTO) {
    if (!name || !description) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Nenhum dado fornecido.`,
        },
        404,
      );
    }

    return this.prisma.category.create({
      data: {
        id,
        name,
        description,
        scope,
      },
    });
  }

  getById(id: string) {
    return this.prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  getAllCategories() {
    return this.prisma.category.findMany();
  }

  update(id: string, updatedData: Partial<Category>) {
    return this.prisma.category.update({
      where: {
        id,
      },
      data: updatedData,
    });
  }

  delete(id: string) {
    return this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
