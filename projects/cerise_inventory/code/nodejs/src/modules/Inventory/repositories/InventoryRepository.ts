import { Inventory, PrismaClient } from "@prisma/client";
import { CreateInventoryDTO } from "../useCases/CreateInventory/CreateInventoryDTO";
import { IInventoryRepository } from "./interfaces/IInventoryRepository";
import ValidationException from "../../../exceptions/ValidationException";
import { HttpExceptionEnum } from "../../../exceptions";

export default class InventoryRepository implements IInventoryRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create({
    userId,
    year,
    corporationId,
    name,
    status,
    createdBy,
  }: CreateInventoryDTO) {
    if (!userId || !corporationId) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Ids são obrigatórios para criar um inventário.`,
        },
        404,
      );
    }

    return this.prisma.inventory.create({
      data: {
        userId,
        year: Number(year),
        corporationId,
        name,
        status,
        createdBy,
      },
    });
  }

  getById(id: string) {
    return this.prisma.inventory.findUnique({
      where: {
        id,
      },
      include: {
        inventoryItems: true,
      },
    });
  }

  getByUserId(userId: string) {
    return this.prisma.inventory.findMany({
      where: {
        AND: {
          userId: userId,
          isActive: true,
        },
      },
    });
  }

  getAllInventories() {
    return this.prisma.inventory.findMany({
      where: {
        isActive: true,
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

    return this.prisma.inventory.update({
      where: {
        id,
      },
      data: updatedData,
    });
  }

  updateCascade(id: string, updatedData: Partial<Inventory>) {
    if (!Object.keys(updatedData).length) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Nenhum dado de atualização fornecido.`,
        },
        404,
      );
    }

    return this.prisma.inventory.update({
      where: {
        id,
      },
      data: {
        inventoryItems: {
          updateMany: {
            where: {
              inventoryId: id,
            },
            data: updatedData,
          },
        },
      },
      include: {
        inventoryItems: true,
      },
    });
  }

  delete(id: string) {
    return this.prisma.inventory.delete({
      where: {
        id,
      },
    });
  }
}
