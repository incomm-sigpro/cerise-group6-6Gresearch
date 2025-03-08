import { Corporation, PrismaClient } from "@prisma/client";
import { CreateCorporationDTO } from "../useCases/CreateCorporation/CreateCorporationDTO";
import { ICorporationRepository } from "./interfaces/ICorporationRepository";
import ValidationException from "../../../exceptions/ValidationException";
import { HttpExceptionEnum } from "../../../exceptions";

export default class CorporationRepository implements ICorporationRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create({
    name,
    cnpj,
    energyConsumption,
    airConditioners,
    computers,
    employeeTransportation,
    mainActivity,
    suppliers,
    wasteGeneration,
  }: CreateCorporationDTO) {
    return this.prisma.corporation.create({
      data: {
        name,
        cnpj,
        energyConsumption,
        airConditioners,
        computers,
        employeeTransportation,
        mainActivity,
        suppliers,
        wasteGeneration,
      },
    });
  }

  getById(id: string) {
    return this.prisma.corporation.findUnique({
      where: {
        id,
      },
    });
  }

  async getByUserId(userId: string) {
    const userCorporations = await this.prisma.userCorporation.findMany({
      where: {
        userId,
      },
    });

    const corporationsPromises: Promise<any>[] = userCorporations.map(
      (userCorporation) => {
        return this.prisma.corporation.findFirst({
          where: {
            id: userCorporation.corporationId,
          },
        });
      },
    );

    const corporations = await Promise.all(corporationsPromises);

    return corporations;
  }
  getAllCorporations() {
    return this.prisma.corporation.findMany();
  }

  update(id: string, updatedData: Partial<Corporation>) {
    if (!Object.keys(updatedData).length) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Nenhum dado de atualização fornecido.`,
        },
        404,
      );
    }

    return this.prisma.corporation.update({
      where: {
        id,
      },
      data: updatedData,
    });
  }

  delete(id: string) {
    return this.prisma.corporation.delete({
      where: {
        id,
      },
    });
  }
}
