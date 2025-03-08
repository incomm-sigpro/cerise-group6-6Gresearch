import { getPrisma } from "../../../../db/prisma";
import ContactRepository from "../../../../modules/User/repositories/ContactRepository";
import UpdateContactController from "./UpdateContactController";
import UpdateContactUseCase from "./UpdateContactUseCase";

export default async function UpdateContact() {
  const prisma = await getPrisma();

  const contactRepository = new ContactRepository(prisma);

  const updateContactUseCase = new UpdateContactUseCase(contactRepository);
  const updateContactController = new UpdateContactController(
    updateContactUseCase,
  );

  return { updateContactUseCase, updateContactController };
}
