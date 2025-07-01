import { PermissionTypeGroup, PrismaClient, Roles } from "@prisma/client";
import { IPermissionsRepository } from "./interfaces/IPermissionsRepository";
import { HttpExceptionEnum } from "../../../exceptions";
import ValidationException from "../../../exceptions/ValidationException";

export default class PermissionsRepository implements IPermissionsRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getById(id: string) {
    return this.prisma.userPermissionGroups.findFirstOrThrow({
      where: {
        id,
      },
      select: {
        id: true,
        userId: true,
        permissionGroup: {
          select: {
            role: true,
          },
        },
      },
    });
  }

  async getByUserId(userId: string) {
    return this.prisma.userPermissionGroups.findMany({
      where: {
        OR: [
          {
            userId,
            deletedAt: null,
          },
          {
            userId,
            deletedAt: {
              gte: new Date(),
            },
          },
        ],
      },
      select: {
        permissionGroup: {
          select: {
            role: true,
            id: true,
          },
        },
      },
    });
  }

  async getAllByUserId(userId: string) {
    return this.prisma.userPermissionGroups.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        createdAt: true,
        userId: true,
        permissionGroup: {
          select: {
            role: true,
          },
        },
      },
    });
  }

  async getRoles(type: PermissionTypeGroup) {
    return this.prisma.permissionGroups.findMany({
      where: {
        type,
      },
      select: {
        role: true,
      },
    });
  }

  getByRoles(role: Array<Roles>) {
    return this.prisma.permissionGroups.findMany({
      where: {
        role: {
          in: role,
        },
      },
    });
  }

  // TODO agora que o addRole() foi criado e ele possui
  // algumas validações, faz sentido usar somente ele
  async create(userId: string, roles: Array<Roles>) {
    const rolesExists = await this.getByRoles(roles);

    return this.prisma.$transaction(
      rolesExists.map((role) =>
        this.prisma.userPermissionGroups.create({
          data: {
            userId,
            permissionGroupId: role.id,
          },
        }),
      ),
    );
  }

  async addRole(userId: string, role: Roles) {
    if (!userId) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Usuário não encontrado.`,
        },
        404,
      );
    }

    const permissionGroups = await this.getByUserId(userId);
    const currentPermissionGroup = permissionGroups.find(
      ({ permissionGroup }) => permissionGroup.role === role,
    );

    if (currentPermissionGroup) {
      return null;
    }

    return this.create(userId, [role]);
  }

  async removeRole(userId: string, role: Roles) {
    if (!userId) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Usuário não encontrado.`,
        },
        404,
      );
    }

    const permissionGroups = await this.getByUserId(userId);
    const currentPermissionGroup = permissionGroups.find(
      ({ permissionGroup }) => permissionGroup.role === role,
    );

    if (!currentPermissionGroup) {
      return null;
    }

    return this.prisma.userPermissionGroups.delete({
      where: {
        userId_permissionGroupId: {
          userId,
          permissionGroupId: currentPermissionGroup.permissionGroup.id,
        },
      },
    });
  }
}
