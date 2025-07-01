import { UserCorporation } from "@prisma/client";
import { CreateUserCorporationDTO } from "../../useCases/CreateUserCorporation/CreateUserCorporationDTO";

export interface IUserCorporationRepository {
  create(userCorporation: CreateUserCorporationDTO): Promise<UserCorporation>;
  getById(userCorporationId: string): Promise<UserCorporation | null>;
  getAllUserCorporations(): Promise<UserCorporation[] | null>;
  getByUserId(userId: string): Promise<UserCorporation[] | null>;
  update(userCorporationId: string, updatedUserCorporationData: Partial<UserCorporation>): Promise<UserCorporation>;
  delete(userCorporationId: string): Promise<UserCorporation>;
}
