import { Telephone, PrismaClient } from "@prisma/client";
import { CreatePhoneDTO } from "../useCases/CreatePhone/CreatePhoneDTO";
import { IPhoneRepository } from "./interfaces/IPhoneRepository";
import ValidationException from "../../../exceptions/ValidationException";
import { HttpExceptionEnum } from "../../../exceptions";

export default class PhoneRepository implements IPhoneRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  create({ type, number, userId }: CreatePhoneDTO) {
    return this.prisma.telephone.create({
      data: {
        type,
        number,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  getById(id: string) {
    return this.prisma.telephone.findUnique({
      where: {
        id,
      },
    });
  }

  getByUserId(userId: string) {
    return this.prisma.telephone.findMany({
      where: {
        userId,
      },
    });
  }

  async update(id: string, updatedData: Partial<Telephone>) {
    if (!Object.keys(updatedData).length) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Nenhum dado de atualização fornecido.`,
        },
        404,
      );
    }

    return this.prisma.telephone.update({
      where: {
        id,
      },
      data: updatedData,
    });
  }

  delete(id: string) {
    return this.prisma.telephone.delete({
      where: {
        id,
      },
    });
  }
}
