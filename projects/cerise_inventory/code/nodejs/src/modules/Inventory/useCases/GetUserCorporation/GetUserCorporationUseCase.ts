import { IUserCorporationRepository } from "../../../../modules/Inventory/repositories/interfaces/IUserCorporationRepository";

export default class GetUserCorporationUseCase {
  private userCorporationRepository: IUserCorporationRepository;

  constructor(userCorporationRepository: IUserCorporationRepository) {
    this.userCorporationRepository = userCorporationRepository;
  }

  async execute(userCorporationId: string) {
    return this.userCorporationRepository.getById(userCorporationId);
  }
}
