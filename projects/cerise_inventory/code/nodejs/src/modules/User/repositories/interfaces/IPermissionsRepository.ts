import {
  PermissionTypeGroup,
  Prisma,
  Roles,
  UserPermissionGroups,
} from "@prisma/client";

export interface IPermissionsRepository {
  getById(id: string): Promise<{
    id: string;
    userId: string | null;
    permissionGroup: { role: Roles };
  }>;

  getByUserId(
    userId: string
  ): Promise<Array<{ permissionGroup: { role: Roles } }>>;

  getAllByUserId(
    userId: string
  ): Promise<Array<{ permissionGroup: { role: Roles } }>>;

  getRoles(type: PermissionTypeGroup): Promise<{ role: Roles }[]>;

  create(
    userId: string,
    roles: Array<Roles>
  ): Promise<Array<UserPermissionGroups>>;

  addRole(
    userId: string,
    role: Roles
  ): Promise<Array<UserPermissionGroups> | null>;

  removeRole(userId: string, role: Roles): Promise<UserPermissionGroups | null>;
}