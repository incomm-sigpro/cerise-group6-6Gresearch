import { getPrisma } from "../../../../db/prisma";
import MessageRepository from "../../../../modules/User/repositories/MessageRepository";
import DeleteMessageController from "./DeleteMessageController";
import DeleteMessageUseCase from "./DeleteMessageUseCase";

export default async function DeleteMessage() {
  const prisma = await getPrisma();

  const messageRepository = new MessageRepository(prisma);

  const deleteMessageUseCase = new DeleteMessageUseCase(messageRepository);
  const deleteMessageController = new DeleteMessageController(
    deleteMessageUseCase,
  );

  return { deleteMessageUseCase, deleteMessageController };
}
