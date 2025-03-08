import { IAddressRepository } from "../../../../modules/Inventory/repositories/interfaces/IAddressRepository";

export default class GetAddressUseCase {
  private addressRepository: IAddressRepository;

  constructor(addressRepository: IAddressRepository) {
    this.addressRepository = addressRepository;
  }

  async execute(addressId: string) {
    return this.addressRepository.getById(addressId);
  }
}
