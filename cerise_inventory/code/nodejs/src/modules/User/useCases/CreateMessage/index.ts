import { getPrisma } from "../../../../db/prisma";
import MessageRepository from "../../repositories/MessageRepository";
import CreateMessageController from "./CreateMessageController";
import CreateMessageUseCase from "./CreateMessageUseCase";

export default async function CreateMessage() {
  const prisma = await getPrisma();

  const messageRepository = new MessageRepository(prisma);

  const createMessageUseCase = new CreateMessageUseCase(messageRepository);
  const createMessageController = new CreateMessageController(
    createMessageUseCase,
  );

  return { createMessageUseCase, createMessageController };
}
