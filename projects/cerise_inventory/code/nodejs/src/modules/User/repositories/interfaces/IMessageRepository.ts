import { Message } from "@prisma/client";
import { CreateMessageDTO } from "../../useCases/CreateMessage/CreateMessageDTO";

export interface IMessageRepository {
  create(message: CreateMessageDTO): Promise<Message>;
  getById(messageId: string): Promise<Message | null>;
  getByUserId(userId: string): Promise<Message[] | null>;
  update(messageId: string, updatedMessageData: Partial<Message>): Promise<Message>;
  delete(messageId: string): Promise<Message>;
}
