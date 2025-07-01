import { IUserCorporationRepository } from "../../repositories/interfaces/IUserCorporationRepository";
import { CreateUserCorporationDTO } from "./CreateUserCorporationDTO";

export default class CreateUserCorporationUseCase {
  private userCorporationRepository: IUserCorporationRepository;

  constructor(userCorporationRepository: IUserCorporationRepository) {
    this.userCorporationRepository = userCorporationRepository;
  }

  async execute({
    user,
    userId,
    corporation,
    corporationId,
  }: CreateUserCorporationDTO) {
    return this.userCorporationRepository.create({
      user,
      userId,
      corporation,
      corporationId,
    });
  }
}