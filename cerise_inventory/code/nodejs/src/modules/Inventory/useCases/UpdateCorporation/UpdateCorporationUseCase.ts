import { Corporation } from "@prisma/client";
import { ICorporationRepository } from "../../../../modules/Inventory/repositories/interfaces/ICorporationRepository";
import ValidationException from "../../../../exceptions/ValidationException";
import { HttpExceptionEnum } from "../../../../exceptions";

export default class UpdateCorporationUseCase {
  private corporationRepository: ICorporationRepository;

  constructor(corporationRepository: ICorporationRepository) {
    this.corporationRepository = corporationRepository;
  }

  async execute(
    corporationId: string,
    updatedCorporationData: Partial<Corporation>,
  ) {
    const existingCorporation =
      await this.corporationRepository.getById(corporationId);

    if (!existingCorporation) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Empresa não encontrada.`,
        },
        404,
      );
    }

    const updatedCorporation = await this.corporationRepository.update(
      corporationId,
      updatedCorporationData,
    );

    return updatedCorporation;
  }
}
