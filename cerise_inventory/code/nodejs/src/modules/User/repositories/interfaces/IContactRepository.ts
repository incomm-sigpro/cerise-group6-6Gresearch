import { Contact } from "@prisma/client";
import { CreateContactDTO } from "../../useCases/CreateContact/CreateContactDTO";

export interface IContactRepository {
  create(contact: CreateContactDTO): Promise<Contact>;
  getById(contactId: string): Promise<Contact | null>;
  getByUserId(userId: string): Promise<Contact[] | null>;
  update(contactId: string, updatedContactData: Partial<Contact>): Promise<Contact>;
  delete(contactId: string): Promise<Contact>;
}
