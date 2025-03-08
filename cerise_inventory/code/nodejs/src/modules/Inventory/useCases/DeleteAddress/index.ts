import { getPrisma } from "../../../../db/prisma";
import AddressRepository from "../../../../modules/Inventory/repositories/AddressRepository";
import DeleteAddressController from "./DeleteAddressController";
import DeleteAddressUseCase from "./DeleteAddressUseCase";

export default async function DeleteAddress() {
  const prisma = await getPrisma();

  const addressRepository = new AddressRepository(prisma);

  const deleteAddressUseCase = new DeleteAddressUseCase(addressRepository);
  const deleteAddressController = new DeleteAddressController(
    deleteAddressUseCase,
  );

  return { deleteAddressUseCase, deleteAddressController };
}
