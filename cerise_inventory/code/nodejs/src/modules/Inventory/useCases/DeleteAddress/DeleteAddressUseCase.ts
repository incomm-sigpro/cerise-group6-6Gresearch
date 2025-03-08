import { HttpExceptionEnum } from "../../../../exceptions";
import ValidationException from "../../../../exceptions/ValidationException";
import { IAddressRepository } from "../../../../modules/Inventory/repositories/interfaces/IAddressRepository";

export default class DeleteAddressUseCase {
  private addressRepository: IAddressRepository;

  constructor(addressRepository: IAddressRepository) {
    this.addressRepository = addressRepository;
  }

  async execute(addressId: string) {
    return this.addressRepository.delete(addressId);
  }
}
