import { getPrisma } from "../../../../db/prisma";
import PhoneRepository from "../../../../modules/User/repositories/PhoneRepository";
import UpdatePhoneController from "./UpdatePhoneController";
import UpdatePhoneUseCase from "./UpdatePhoneUseCase";

export default async function UpdatePhone() {
  const prisma = await getPrisma();

  const phoneRepository = new PhoneRepository(prisma);

  const updatePhoneUseCase = new UpdatePhoneUseCase(phoneRepository);
  const updatePhoneController = new UpdatePhoneController(updatePhoneUseCase);

  return { updatePhoneUseCase, updatePhoneController };
}
