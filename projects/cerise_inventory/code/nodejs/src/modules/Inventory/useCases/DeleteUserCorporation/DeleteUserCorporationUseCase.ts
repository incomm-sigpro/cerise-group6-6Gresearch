import { HttpExceptionEnum } from "../../../../exceptions";
import ValidationException from "../../../../exceptions/ValidationException";
import { IUserCorporationRepository } from "../../../../modules/Inventory/repositories/interfaces/IUserCorporationRepository";

export default class DeleteUserCorporationUseCase {
  private userCorporationRepository: IUserCorporationRepository;

  constructor(userCorporationRepository: IUserCorporationRepository) {
    this.userCorporationRepository = userCorporationRepository;
  }

  async execute(userCorporationId: string) {
    const userCorporationToDelete =
      await this.userCorporationRepository.getById(userCorporationId);

    if (!userCorporationToDelete) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Empresa não encontrada.`,
        },
        404,
      );
    }

    await this.userCorporationRepository.delete(userCorporationId);

    return "Empresa de usuário excluída com sucesso";
  }
}
