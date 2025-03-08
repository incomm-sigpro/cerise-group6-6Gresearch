import { Telephone } from "@prisma/client";
import { IPhoneRepository } from "../../../../modules/User/repositories/interfaces/IPhoneRepository";
import ValidationException from "../../../../exceptions/ValidationException";
import { HttpExceptionEnum } from "../../../../exceptions";

export default class UpdatePhoneUseCase {
  private phoneRepository: IPhoneRepository;

  constructor(phoneRepository: IPhoneRepository) {
    this.phoneRepository = phoneRepository;
  }

  async execute(phoneId: string, updatedPhoneData: Partial<Telephone>) {
    const existingPhone = await this.phoneRepository.getById(phoneId);

    if (!existingPhone) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Usuário não encontrado.`,
        },
        404,
      );
    }

    const updatedPhone = await this.phoneRepository.update(
      phoneId,
      updatedPhoneData,
    );

    return updatedPhone;
  }
}
