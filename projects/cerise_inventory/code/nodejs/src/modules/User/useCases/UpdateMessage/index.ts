import { getPrisma } from "../../../../db/prisma";
import MessageRepository from "../../../../modules/User/repositories/MessageRepository";
import UpdateMessageController from "./UpdateMessageController";
import UpdateMessageUseCase from "./UpdateMessageUseCase";

export default async function UpdateMessage() {
  const prisma = await getPrisma();

  const messageRepository = new MessageRepository(prisma);

  const updateMessageUseCase = new UpdateMessageUseCase(messageRepository);
  const updateMessageController = new UpdateMessageController(
    updateMessageUseCase,
  );

  return { updateMessageUseCase, updateMessageController };
}
