import { IPhoneRepository } from "../../../../modules/User/repositories/interfaces/IPhoneRepository";

export default class GetPhoneUseCase {
  private phoneRepository: IPhoneRepository;

  constructor(phoneRepository: IPhoneRepository) {
    this.phoneRepository = phoneRepository;
  }

  async execute(phoneId: string) {
    return this.phoneRepository.getById(phoneId);
  }
}
