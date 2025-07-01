import { Message, PrismaClient } from "@prisma/client";
import { CreateMessageDTO } from "../useCases/CreateMessage/CreateMessageDTO";
import { IMessageRepository } from "./interfaces/IMessageRepository";

export default class MessageRepository implements IMessageRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  create({
    title,
    content,
    type,
    userId
  }: CreateMessageDTO) {
    return this.prisma.message.create({
      data: {
        title,
        content,
        type,
        user: {
          connect: {
            id: userId
          }
        }
      },
    });    
  }

  getById(id: string) {
    return this.prisma.message.findUnique({
      where: {
        id,
      },
    });
  }

  getByUserId(userId: string) {
    return this.prisma.message.findMany({
      where: {
        userId,
      },
    });
  }
  
  async update(
    id: string,
    updatedData: Partial<Message>,
   ) {
    if (!Object.keys(updatedData).length) {
      throw new Error("Nenhum dado de atualização fornecido.");
    }
    
    return this.prisma.message.update({
      where: {
        id,
      },
      data: updatedData,
    });
  }

  delete(id: string) {
    return this.prisma.message.delete({
      where: {
        id,
      },
    });
  }
}

