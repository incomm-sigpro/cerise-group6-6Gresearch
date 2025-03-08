import { IMessageRepository } from "../../../../modules/User/repositories/interfaces/IMessageRepository";

export default class DeleteMessageUseCase {
  private messageRepository: IMessageRepository;

  constructor(messageRepository: IMessageRepository) {
    this.messageRepository = messageRepository;
  }

  async execute(messageId: string) {
    const messageToDelete = await this.messageRepository.getById(messageId);

    if (!messageToDelete) {
      throw new Error("Mensagem não encontrada");
    }

    await this.messageRepository.delete(messageId);

    return "Mensagem excluída com sucesso";
  }
}
