import { getPrisma } from "../../../../db/prisma";
import AddressRepository from "../../repositories/AddressRepository";
import CreateAddressController from "./CreateAddressController";
import CreateAddressUseCase from "./CreateAddressUseCase";

export default async function CreateAddress() {
  const prisma = await getPrisma();

  const addressRepository = new AddressRepository(prisma);

  const createAddressUseCase = new CreateAddressUseCase(addressRepository);
  const createAddressController = new CreateAddressController(
    createAddressUseCase,
  );

  return { createAddressUseCase, createAddressController };
}
