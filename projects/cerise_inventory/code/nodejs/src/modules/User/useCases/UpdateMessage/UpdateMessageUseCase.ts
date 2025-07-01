import { Message } from "@prisma/client";
import { IMessageRepository } from "../../../../modules/User/repositories/interfaces/IMessageRepository";

export default class UpdateMessageUseCase {
  private messageRepository: IMessageRepository;

  constructor(messageRepository: IMessageRepository) {
    this.messageRepository = messageRepository;
  }

  async execute(messageId: string, updatedMessageData: Partial<Message>) {
    const existingMessage = await this.messageRepository.getById(messageId);

    if (!existingMessage) {
      throw new Error("Mensagem não encontrada");
    }

    const updatedMessage = await this.messageRepository.update(
      messageId,
      updatedMessageData,
    );

    return updatedMessage;
  }
}
