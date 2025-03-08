import { ICorporationRepository } from "../../repositories/interfaces/ICorporationRepository";
import { CreateCorporationDTO } from "./CreateCorporationDTO";

export default class CreateCorporationUseCase {
  private corporationRepository: ICorporationRepository;

  constructor(corporationRepository: ICorporationRepository) {
    this.corporationRepository = corporationRepository;
  }

  async execute({
    name,
    cnpj,
    energyConsumption,
    airConditioners,
    computers,
    employeeTransportation,
    mainActivity,
    suppliers,
    wasteGeneration,
    userCorporation,
    inventories,
  }: CreateCorporationDTO) {
    return this.corporationRepository.create({
      name,
      cnpj,
      energyConsumption,
      airConditioners,
      computers,
      employeeTransportation,
      mainActivity,
      suppliers,
      wasteGeneration,
      userCorporation,
      inventories,
    });
  }
}