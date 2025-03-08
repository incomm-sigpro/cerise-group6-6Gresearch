import { getPrisma } from "../../../../db/prisma";
import AddressRepository from "../../../../modules/Inventory/repositories/AddressRepository";
import UpdateAddressController from "./UpdateAddressController";
import UpdateAddressUseCase from "./UpdateAddressUseCase";

export default async function UpdateAddress() {
  const prisma = await getPrisma();

  const addressRepository = new AddressRepository(prisma);

  const updateAddressUseCase = new UpdateAddressUseCase(addressRepository);
  const updateAddressController = new UpdateAddressController(
    updateAddressUseCase,
  );

  return { updateAddressUseCase, updateAddressController };
}
