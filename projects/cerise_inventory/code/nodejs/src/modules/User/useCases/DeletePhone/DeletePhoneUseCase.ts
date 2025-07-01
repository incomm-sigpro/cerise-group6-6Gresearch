import { HttpExceptionEnum } from "../../../../exceptions";
import ValidationException from "../../../../exceptions/ValidationException";
import { IPhoneRepository } from "../../../../modules/User/repositories/interfaces/IPhoneRepository";

export default class DeletePhoneUseCase {
  private phoneRepository: IPhoneRepository;

  constructor(phoneRepository: IPhoneRepository) {
    this.phoneRepository = phoneRepository;
  }

  async execute(phoneId: string) {
    const phoneToDelete = await this.phoneRepository.getById(phoneId);

    if (!phoneToDelete) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `telefone inválido.`,
        },
        404,
      );
    }

    await this.phoneRepository.delete(phoneId);

    return "Telephone excluído com sucesso";
  }
}
