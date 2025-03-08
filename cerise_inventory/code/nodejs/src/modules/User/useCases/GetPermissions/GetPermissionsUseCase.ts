import { IUserRepository } from "../../../../modules/User/repositories/interfaces/IUserRepository";
import { IPermissionsRepository } from "../../repositories/interfaces/IPermissionsRepository";

export default class GetPermissionsUseCase {
  private permissionsRepository: IPermissionsRepository;

  constructor(permissionsRepository: IPermissionsRepository) {
    this.permissionsRepository = permissionsRepository;
  }

  async execute(userId: string) {
    return this.permissionsRepository.getById(userId);
  }
}
