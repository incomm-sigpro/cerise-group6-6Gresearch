import { User } from "@prisma/client";
import { CreateUserDTO } from "../../useCases/CreateUser/CreateUserDTO";

export interface IUserRepository {
  authenticate(email: string): Promise<User | null>;
  setFirstLoginDate(userId: string): Promise<User>;
  create(user: CreateUserDTO): Promise<User>;
  getById(userId: string): Promise<User | null>;
  getAllUsers(): Promise<User[] | null>;
  update(userId: string, updatedUserData: Partial<User>): Promise<User>;
  delete(userId: string): Promise<User | null>;
}
