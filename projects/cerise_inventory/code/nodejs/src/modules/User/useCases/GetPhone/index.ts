import { getPrisma } from "../../../../db/prisma";
import PhoneRepository from "../../../../modules/User/repositories/PhoneRepository";
import GetPhoneController from "./GetPhoneController";
import GetPhoneUseCase from "./GetPhoneUseCase";

export default async function GetPhone() {
  const prisma = await getPrisma();

  const phoneRepository = new PhoneRepository(prisma);

  const getPhoneUseCase = new GetPhoneUseCase(phoneRepository);
  const getPhoneController = new GetPhoneController(getPhoneUseCase);

  return { getPhoneUseCase, getPhoneController };
}
