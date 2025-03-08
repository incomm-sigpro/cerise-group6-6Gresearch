import { Address } from "@prisma/client";
import { IAddressRepository } from "../../../../modules/Inventory/repositories/interfaces/IAddressRepository";
import ValidationException from "../../../../exceptions/ValidationException";
import { HttpExceptionEnum } from "../../../../exceptions";

export default class UpdateAddressUseCase {
  private addressRepository: IAddressRepository;

  constructor(addressRepository: IAddressRepository) {
    this.addressRepository = addressRepository;
  }

  async execute(addressId: string, updatedAddressData: Partial<Address>) {
    const existingAddress = await this.addressRepository.getById(addressId);

    if (!existingAddress) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Empresa não encontrada.`,
        },
        404,
      );
    }

    const updatedAddress = await this.addressRepository.update(
      addressId,
      updatedAddressData,
    );

    return updatedAddress;
  }
}
