import { UserCorporation, PrismaClient } from "@prisma/client";
import { CreateUserCorporationDTO } from "../useCases/CreateUserCorporation/CreateUserCorporationDTO";
import { IUserCorporationRepository } from "./interfaces/IUserCorporationRepository";
import ValidationException from "../../../exceptions/ValidationException";
import { HttpExceptionEnum } from "../../../exceptions";

export default class UserCorporationRepository
  implements IUserCorporationRepository
{
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create({
    user,
    userId,
    corporation,
    corporationId,
  }: CreateUserCorporationDTO) {
    return this.prisma.userCorporation.create({
      data: {
        userId,
        corporationId,
      },
    });
  }

  getById(id: string) {
    return this.prisma.userCorporation.findUnique({
      where: {
        id,
      },
    });
  }

  getByUserId(userId: string) {
    return this.prisma.userCorporation.findMany({
      where: {
        userId,
      },
    });
  }

  getAllUserCorporations() {
    return this.prisma.userCorporation.findMany();
  }

  update(id: string, updatedData: Partial<UserCorporation>) {
    if (!Object.keys(updatedData).length) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Nenhum dado de atualização fornecido.`,
        },
        404,
      );
    }

    return this.prisma.userCorporation.update({
      where: {
        id,
      },
      data: updatedData,
    });
  }

  delete(id: string) {
    return this.prisma.userCorporation.delete({
      where: {
        id,
      },
    });
  }
}
