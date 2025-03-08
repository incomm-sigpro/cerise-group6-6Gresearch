import { IMessageRepository } from "../../repositories/interfaces/IMessageRepository";
import { CreateMessageDTO } from "./CreateMessageDTO";

export default class CreateMessageUseCase {
  private messageRepository: IMessageRepository;

  constructor(messageRepository: IMessageRepository) {
    this.messageRepository = messageRepository;
  }

  async execute({
    title,
    content,
    type,
    user,
    userId
  }: CreateMessageDTO) {
    return this.messageRepository.create({
      title,
      content,
      type,
      user,
      userId
    });
  }
}