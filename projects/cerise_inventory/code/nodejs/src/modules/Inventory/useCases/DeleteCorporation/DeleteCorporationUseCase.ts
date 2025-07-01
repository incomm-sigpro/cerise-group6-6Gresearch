import { HttpExceptionEnum } from "../../../../exceptions";
import ValidationException from "../../../../exceptions/ValidationException";
import { ICorporationRepository } from "../../../../modules/Inventory/repositories/interfaces/ICorporationRepository";

export default class DeleteCorporationUseCase {
  private corporationRepository: ICorporationRepository;

  constructor(corporationRepository: ICorporationRepository) {
    this.corporationRepository = corporationRepository;
  }

  async execute(corporationId: string) {
    const corporationToDelete =
      await this.corporationRepository.getById(corporationId);

    if (!corporationToDelete) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Empresa não encontrada.`,
        },
        404,
      );
    }

    await this.corporationRepository.delete(corporationId);

    return "Empresa excluída com sucesso";
  }
}
