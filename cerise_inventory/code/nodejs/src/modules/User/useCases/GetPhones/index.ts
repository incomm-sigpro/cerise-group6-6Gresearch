import { getPrisma } from "../../../../db/prisma";
import PhoneRepository from "../../../../modules/User/repositories/PhoneRepository";
import GetPhonesController from "./GetPhonesController";
import GetPhonesUseCase from "./GetPhonesUseCase";

export default async function GetPhones() {
  const prisma = await getPrisma();

  const phoneRepository = new PhoneRepository(prisma);

  const getPhonesUseCase = new GetPhonesUseCase(phoneRepository);
  const getPhonesController = new GetPhonesController(getPhonesUseCase);

  return { getPhonesUseCase, getPhonesController };
}
