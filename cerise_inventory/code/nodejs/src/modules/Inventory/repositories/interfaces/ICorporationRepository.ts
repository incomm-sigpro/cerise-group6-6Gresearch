import { Corporation } from "@prisma/client";
import { CreateCorporationDTO } from "../../useCases/CreateCorporation/CreateCorporationDTO";

export interface ICorporationRepository {
  create(corporation: CreateCorporationDTO): Promise<Corporation>;
  getById(corporationId: string): Promise<Corporation | null>;
  getByUserId(userId: string): Promise<Corporation[] | null>;
  getAllCorporations(): Promise<Corporation[] | null>;
  update(
    corporationId: string,
    updatedCorporationData: Partial<Corporation>,
  ): Promise<Corporation>;
  delete(corporationId: string): Promise<Corporation>;
}
