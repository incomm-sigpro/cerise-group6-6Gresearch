import { IContactRepository } from "../../../../modules/User/repositories/interfaces/IContactRepository";

export default class DeleteContactUseCase {
  private contactRepository: IContactRepository;

  constructor(contactRepository: IContactRepository) {
    this.contactRepository = contactRepository;
  }

  async execute(contactId: string) {
    const contactToDelete = await this.contactRepository.getById(contactId);

    if (!contactToDelete) {
      throw new Error("Contato não encontrado");
    }

    await this.contactRepository.delete(contactId);

    return "Contato excluído com sucesso";
  }
}
