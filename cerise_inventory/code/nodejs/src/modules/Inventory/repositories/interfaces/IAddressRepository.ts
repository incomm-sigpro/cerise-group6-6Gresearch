import { Address } from "@prisma/client";
import { CreateAddressDTO } from "../../useCases/CreateAddress/CreateAddressDTO";

export interface IAddressRepository {
  create(address: CreateAddressDTO): Promise<Address>;
  getById(addressId: string): Promise<Address | null>;
  update(addressId: string, updatedAddressData: Partial<Address>): Promise<Address>;
  delete(addressId: string): Promise<Address>;
}
