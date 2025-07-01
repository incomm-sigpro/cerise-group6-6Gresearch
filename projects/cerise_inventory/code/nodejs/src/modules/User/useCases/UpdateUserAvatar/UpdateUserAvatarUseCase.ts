import { HttpExceptionEnum } from "../../../../exceptions";
import ValidationException from "../../../../exceptions/ValidationException";
import { IUserRepository } from "../../../../modules/User/repositories/interfaces/IUserRepository";
import { DiskStorage } from "../../../../providers/DiskStorage";

export default class UpdateUserAvatarUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId: string, userAvatar: string) {
    const existingUser: any = await this.userRepository.getById(userId);
    const diskStorage = new DiskStorage();

    if (!existingUser) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Usuário não encontrado.`,
        },
        404,
      );
    }

    if (existingUser.avatar) {
      await diskStorage.deleteFile(existingUser.avatar);
    }

    const filename = await diskStorage.saveFile(userAvatar);
    existingUser.avatar = filename;

    const updatedUser = await this.userRepository.update(userId, {
      avatar: existingUser.avatar,
    });

    return updatedUser;
  }
}
