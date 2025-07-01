import { Roles } from "@prisma/client";

export type CreateUserDTO = {
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  birthday: Date;
  role: Roles;
  createdBy: string;
};
