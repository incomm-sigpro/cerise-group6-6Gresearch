import { ICorporationRepository } from "../../../../modules/Inventory/repositories/interfaces/ICorporationRepository";

export default class GetCorporationsUseCase {
  private corporationRepository: ICorporationRepository;

  constructor(corporationRepository: ICorporationRepository) {
    this.corporationRepository = corporationRepository;
  }

  async execute() {
    return this.corporationRepository.getAllCorporations();
  }
}
