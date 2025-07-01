import { IContactRepository } from "../../repositories/interfaces/IContactRepository";
import { CreateContactDTO } from "./CreateContactDTO";

export default class CreateContactUseCase {
  private contactRepository: IContactRepository;

  constructor(contactRepository: IContactRepository) {
    this.contactRepository = contactRepository;
  }

  async execute({
    name,
    email,
    telephone,
    user,
    userId
  }: CreateContactDTO) {
    return this.contactRepository.create({
      name,
      email,
      telephone,
      user,
      userId
    });
  }
}