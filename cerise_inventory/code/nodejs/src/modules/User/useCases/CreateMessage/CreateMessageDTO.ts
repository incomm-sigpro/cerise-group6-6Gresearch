import { User } from "@prisma/client";

export type CreateMessageDTO = {
  title: string;
  content: string;
  type: string;
  user: User;
  userId: string;
}