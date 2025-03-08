import { IContactRepository } from "../../../../modules/User/repositories/interfaces/IContactRepository";

export default class GetContactsUseCase {
  private contactRepository: IContactRepository;

  constructor(contactRepository: IContactRepository) {
    this.contactRepository = contactRepository;
  }

  async execute(userId: string) {
    return this.contactRepository.getByUserId(userId);
  }
}
