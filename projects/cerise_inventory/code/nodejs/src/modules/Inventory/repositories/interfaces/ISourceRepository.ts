import { Source } from "@prisma/client";
import { CreateSourceDTO } from "../../useCases/CreateSource/CreateSourceDTO";

export interface ISourceRepository {
  create(source: CreateSourceDTO): Promise<Source>;
  getById(sourceId: string): Promise<Source | null>;
  getAllSources(): Promise<Source[] | null>;
  update(sourceId: string, updatedSourceData: Partial<Source>): Promise<Source>;
  delete(sourceId: string): Promise<Source>;
}
