import { ICorporationRepository } from "../../../../modules/Inventory/repositories/interfaces/ICorporationRepository";

export default class GetCorporationUseCase {
  private corporationRepository: ICorporationRepository;

  constructor(corporationRepository: ICorporationRepository) {
    this.corporationRepository = corporationRepository;
  }

  async execute(corporationId: string) {
    return this.corporationRepository.getById(corporationId);
  }
}
