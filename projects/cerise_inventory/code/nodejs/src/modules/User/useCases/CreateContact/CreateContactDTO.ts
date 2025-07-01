import { User } from "@prisma/client";

export type CreateContactDTO = {
  name: string;
  email: string;
  telephone: string;
  user: User;
  userId: string;
}