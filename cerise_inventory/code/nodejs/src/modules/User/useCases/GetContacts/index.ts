import { getPrisma } from "../../../../db/prisma";
import ContactRepository from "../../../../modules/User/repositories/ContactRepository";
import GetContactsController from "./GetContactsController";
import GetContactsUseCase from "./GetContactsUseCase";

export default async function GetContacts() {
  const prisma = await getPrisma();

  const contactRepository = new ContactRepository(prisma);

  const getContactsUseCase = new GetContactsUseCase(contactRepository);
  const getContactsController = new GetContactsController(getContactsUseCase);

  return { getContactsUseCase, getContactsController };
}
