import { User, PrismaClient } from "@prisma/client";
import argon2i from "argon2";
import { CreateUserDTO } from "../useCases/CreateUser/CreateUserDTO";
import { IUserRepository } from "./interfaces/IUserRepository";
import ValidationException from "../../../exceptions/ValidationException";
import { HttpExceptionEnum } from "../../../exceptions";

export default class UserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  authenticate(email: string) {
    return this.prisma.user.findFirst({
      where: {
        AND: {
          email: {
            equals: email,
          },
          isActive: true,
        },
      },
      include: {
        telephone: true,
        contact: true,
        message: {
          where: {
            isRead: false,
          },
        },
      },
    });
  }

  setFirstLoginDate(userId: string) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        firstLogin: new Date(),
      },
    });
  }

  async create({
    name,
    email,
    password,
    isActive,
    birthday,
    createdBy,
  }: CreateUserDTO) {
    return this.prisma.user.create({
      data: {
        name,
        email,
        password: await argon2i.hash(password),
        isActive,
        birthday,
        createdBy,
      },
    });
  }

  getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  getAllUsers() {
    return this.prisma.user.findMany({
      where: {
        isActive: true,
      },
    });
  }

  async update(id: string, updatedData: Partial<User>) {
    if (!Object.keys(updatedData).length) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Nenhum dado de atualização fornecido.`,
        },
        404,
      );
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data: updatedData,
    });
  }

  delete(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
