import { HttpExceptionEnum } from "../../../../exceptions";
import ValidationException from "../../../../exceptions/ValidationException";
import { IUserRepository } from "../../../../modules/User/repositories/interfaces/IUserRepository";

export default class DeleteUserUseCase {
  private usersRepository: IUserRepository;

  constructor(usersRepository: IUserRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(userId: string) {
    const userToDelete = await this.usersRepository.getById(userId);

    if (!userToDelete) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Usuário não encontrado.`,
        },
        404,
      );
    }

    await this.usersRepository.delete(userId);

    return "Usuário excluído com sucesso";
  }
}
