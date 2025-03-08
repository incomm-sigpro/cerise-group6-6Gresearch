import { IMessageRepository } from "../../../../modules/User/repositories/interfaces/IMessageRepository";

export default class GetMessagesUseCase {
  private messageRepository: IMessageRepository;

  constructor(messageRepository: IMessageRepository) {
    this.messageRepository = messageRepository;
  }

  async execute(userId: string) {
    return this.messageRepository.getByUserId(userId);
  }
}
