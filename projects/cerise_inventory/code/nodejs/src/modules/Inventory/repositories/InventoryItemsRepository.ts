import { Inventory, PrismaClient } from "@prisma/client";
import { CreateInventoryItemsDTO } from "../useCases/CreateInventoryItems/CreateInventoryItemsDTO";
import { IInventoryItemsRepository } from "./interfaces/IInventoryItemsRepository";
import ValidationException from "../../../exceptions/ValidationException";
import { HttpExceptionEnum } from "../../../exceptions";

export default class InventoryItemsRepository
  implements IInventoryItemsRepository
{
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create({
    scope,
    uf,
    description,
    categoryId,
    quantity,
    inventoryId,
    createdBy,
  }: CreateInventoryItemsDTO) {
    // TODO: Validar dados
    if (!categoryId || !inventoryId) {
      console.error("Ids são obrigatórios para criar os itens de inventário.");
    }

    return this.prisma.inventoryItems.create({
      data: {
        scope,
        uf,
        description,
        categoryId,
        quantity,
        inventoryId,
        createdBy,
      },
    });
  }

  getById(id: string) {
    return this.prisma.inventoryItems.findUnique({
      where: {
        id,
      },
    });
  }

  getByInventoryId(id: string) {
    return this.prisma.inventoryItems.findMany({
      where: {
        AND: {
          inventoryId: id,
          isActive: true,
        },
      },
    });
  }

  update(id: string, updatedData: Partial<Inventory>) {
    if (!Object.keys(updatedData).length) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Nenhum dado de atualização fornecido.`,
        },
        404,
      );
    }

    return this.prisma.inventoryItems.update({
      where: {
        id,
      },
      data: updatedData,
    });
  }

  delete(id: string) {
    return this.prisma.inventoryItems.delete({
      where: {
        id,
      },
    });
  }
}
