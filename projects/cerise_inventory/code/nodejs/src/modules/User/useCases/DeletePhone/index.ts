import { getPrisma } from "../../../../db/prisma";
import PhoneRepository from "../../../../modules/User/repositories/PhoneRepository";
import DeletePhoneController from "./DeletePhoneController";
import DeletePhoneUseCase from "./DeletePhoneUseCase";

export default async function DeletePhone() {
  const prisma = await getPrisma();

  const phoneRepository = new PhoneRepository(prisma);

  const deletePhoneUseCase = new DeletePhoneUseCase(phoneRepository);
  const deletePhoneController = new DeletePhoneController(deletePhoneUseCase);

  return { deletePhoneUseCase, deletePhoneController };
}
