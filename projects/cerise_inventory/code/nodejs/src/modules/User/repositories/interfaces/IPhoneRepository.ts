import { Telephone } from "@prisma/client";
import { CreatePhoneDTO } from "../../useCases/CreatePhone/CreatePhoneDTO";

export interface IPhoneRepository {
  create(phone: CreatePhoneDTO): Promise<Telephone>;
  getById(phoneId: string): Promise<Telephone | null>;
  getByUserId(userId: string): Promise<Telephone[] | null>;
  update(phoneId: string, updatedPhoneData: Partial<Telephone>): Promise<Telephone>;
  delete(phoneId: string): Promise<Telephone>;
}
