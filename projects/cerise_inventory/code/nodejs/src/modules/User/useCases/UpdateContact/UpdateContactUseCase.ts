import { Contact } from "@prisma/client";
import { IContactRepository } from "../../../../modules/User/repositories/interfaces/IContactRepository";

export default class UpdateContactUseCase {
  private contactRepository: IContactRepository;

  constructor(contactRepository: IContactRepository) {
    this.contactRepository = contactRepository;
  }

  async execute(contactId: string, updatedContactData: Partial<Contact>) {
    const existingContact = await this.contactRepository.getById(contactId);

    if (!existingContact) {
      throw new Error("Contato não encontrado");
    }

    const updatedContact = await this.contactRepository.update(
      contactId,
      updatedContactData,
    );

    return updatedContact;
  }
}
