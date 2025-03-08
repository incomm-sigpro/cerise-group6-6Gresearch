import { Source, PrismaClient } from "@prisma/client";
import { CreateSourceDTO } from "../useCases/CreateSource/CreateSourceDTO";
import { ISourceRepository } from "./interfaces/ISourceRepository";

export default class SourceRepository implements ISourceRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create({
    name,
    description,
    scope,
    categoryId,
    measurementUnit,
  }: CreateSourceDTO) {
    if (!name || !description) {
      console.error("Campos obrigatórios estão ausentes");
    }

    return this.prisma.source.create({
      data: {
        name,
        description,
        scope,
        categoryId,
        measurementUnit,
      },
    }); 
  }

  getById(id: string) {
    return this.prisma.source.findUnique({
      where: {
        id,
      },
    });
  }

  getAllSources() {
    return this.prisma.source.findMany();
  }
  
  update(
    id: string,
    updatedData: Partial<Source>
    ) {
      return this.prisma.source.update({
        where: {
          id,
        },
        data: updatedData,
      });
  }

  delete(id: string) {
    return this.prisma.source.delete({
      where: {
        id,
      },
    });
  }
}
