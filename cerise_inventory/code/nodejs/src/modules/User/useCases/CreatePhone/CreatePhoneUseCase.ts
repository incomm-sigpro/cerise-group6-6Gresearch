import { IPhoneRepository } from "../../repositories/interfaces/IPhoneRepository";
import { CreatePhoneDTO } from "./CreatePhoneDTO";

export default class CreatePhoneUseCase {
  private phoneRepository: IPhoneRepository;

  constructor(phoneRepository: IPhoneRepository) {
    this.phoneRepository = phoneRepository;
  }

  async execute({
    type,
    number,
    user,
    userId
  }: CreatePhoneDTO) {
    return this.phoneRepository.create({
      type,
      number,
      user,
      userId
    });
  }
}