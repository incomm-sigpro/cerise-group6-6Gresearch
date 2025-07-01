import { TelephoneType, User } from "@prisma/client";

export type CreatePhoneDTO = {
  type: TelephoneType;
  number: string;
  user: User;
  userId: string;
}