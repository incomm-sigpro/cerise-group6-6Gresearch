import { Address, PrismaClient } from "@prisma/client";
import { CreateAddressDTO } from "../useCases/CreateAddress/CreateAddressDTO";
import { IAddressRepository } from "./interfaces/IAddressRepository";
import ValidationException from "../../../exceptions/ValidationException";
import { HttpExceptionEnum } from "../../../exceptions";

export default class AddressRepository implements IAddressRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async create({
    street,
    number,
    complement,
    sector,
    city,
    state,
    country,
    zipCode,
    latitude,
    longitude,
    corporationId,
  }: CreateAddressDTO) {
    return this.prisma.address.create({
      data: {
        street,
        number,
        complement,
        sector,
        city,
        state,
        country,
        zipCode,
        latitude,
        longitude,
        corporationId,
      },
    });
  }

  getById(id: string) {
    return this.prisma.address.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updatedData: Partial<Address>) {
    if (!Object.keys(updatedData).length) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Nenhum dado de atualização fornecido.`,
        },
        404,
      );
    }

    return this.prisma.address.update({
      where: {
        id,
      },
      data: updatedData,
    });
  }

  delete(id: string) {
    return this.prisma.address.delete({
      where: {
        id,
      },
    });
  }
}
