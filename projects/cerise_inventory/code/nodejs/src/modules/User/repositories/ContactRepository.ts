import { Contact, PrismaClient } from "@prisma/client";
import { CreateContactDTO } from "../useCases/CreateContact/CreateContactDTO";
import { IContactRepository } from "./interfaces/IContactRepository";

export default class ContactRepository implements IContactRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  create({
    name,
    email,
    telephone,
    userId
  }: CreateContactDTO) {
    return this.prisma.contact.create({
      data: {
        name,
        email,
        telephone,
        user: {
          connect: {
            id: userId
          }
        }
      },
    });    
  }

  getById(id: string) {
    return this.prisma.contact.findUnique({
      where: {
        id,
      },
    });
  }

  getByUserId(userId: string) {
    return this.prisma.contact.findMany({
      where: {
        userId,
      },
    });
  }
  
  async update(
    id: string,
    updatedData: Partial<Contact>,
   ) {
    if (!Object.keys(updatedData).length) {
      throw new Error("Nenhum dado de atualização fornecido.");
    }
    
    return this.prisma.contact.update({
      where: {
        id,
      },
      data: updatedData,
    });
  }

  delete(id: string) {
    return this.prisma.contact.delete({
      where: {
        id,
      },
    });
  }
}

