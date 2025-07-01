import { UserCorporation } from "@prisma/client";
import { IUserCorporationRepository } from "../../../../modules/Inventory/repositories/interfaces/IUserCorporationRepository";
import ValidationException from "../../../../exceptions/ValidationException";
import { HttpExceptionEnum } from "../../../../exceptions";

export default class UpdateUserCorporationUseCase {
  private userCorporationRepository: IUserCorporationRepository;

  constructor(userCorporationRepository: IUserCorporationRepository) {
    this.userCorporationRepository = userCorporationRepository;
  }

  async execute(
    userCorporationId: string,
    updatedUserCorporationData: Partial<UserCorporation>,
  ) {
    const existingUserCorporation =
      await this.userCorporationRepository.getById(userCorporationId);

    if (!existingUserCorporation) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Empresa não encontrada.`,
        },
        404,
      );
    }

    const updatedUserCorporation = await this.userCorporationRepository.update(
      userCorporationId,
      updatedUserCorporationData,
    );

    return updatedUserCorporation;
  }
}
