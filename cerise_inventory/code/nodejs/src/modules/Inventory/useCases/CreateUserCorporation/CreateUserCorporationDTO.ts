import { User, Corporation } from "@prisma/client";

export type CreateUserCorporationDTO = {
  user: User;
  userId: string;
  corporation: Corporation;
  corporationId: string;
}