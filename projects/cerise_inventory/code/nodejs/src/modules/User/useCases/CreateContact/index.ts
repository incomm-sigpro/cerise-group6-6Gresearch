import { getPrisma } from "../../../../db/prisma";
import ContactRepository from "../../repositories/ContactRepository";
import CreateContactController from "./CreateContactController";
import CreateContactUseCase from "./CreateContactUseCase";

export default async function CreateContact() {
  const prisma = await getPrisma();

  const contactRepository = new ContactRepository(prisma);

  const createContactUseCase = new CreateContactUseCase(contactRepository);
  const createContactController = new CreateContactController(
    createContactUseCase,
  );

  return { createContactUseCase, createContactController };
}
