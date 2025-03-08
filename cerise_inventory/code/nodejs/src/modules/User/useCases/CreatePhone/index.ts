import { getPrisma } from "../../../../db/prisma";
import PhoneRepository from "../../repositories/PhoneRepository";
import CreatePhoneController from "./CreatePhoneController";
import CreatePhoneUseCase from "./CreatePhoneUseCase";

export default async function CreatePhone() {
  const prisma = await getPrisma();

  const phoneRepository = new PhoneRepository(prisma);

  const createPhoneUseCase = new CreatePhoneUseCase(phoneRepository);
  const createPhoneController = new CreatePhoneController(createPhoneUseCase);

  return { createPhoneUseCase, createPhoneController };
}
