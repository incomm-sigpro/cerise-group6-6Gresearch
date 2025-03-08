import { getPrisma } from "../../../../db/prisma";
import ContactRepository from "../../../../modules/User/repositories/ContactRepository";
import DeleteContactController from "./DeleteContactController";
import DeleteContactUseCase from "./DeleteContactUseCase";

export default async function DeleteContact() {
  const prisma = await getPrisma();

  const contactRepository = new ContactRepository(prisma);

  const deleteContactUseCase = new DeleteContactUseCase(contactRepository);
  const deleteContactController = new DeleteContactController(
    deleteContactUseCase,
  );

  return { deleteContactUseCase, deleteContactController };
}
