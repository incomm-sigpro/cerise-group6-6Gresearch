import { IUserRepository } from "../../../../modules/User/repositories/interfaces/IUserRepository";

export default class GetUserUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(userId: string) {
    return this.userRepository.getById(userId);
  }
}
