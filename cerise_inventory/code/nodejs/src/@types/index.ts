export type PermissionTypeGroupInterface = {
    USER: string,
    USER_ADMIN: string,
  }
  
export type RolesInterface = {
    IS_ADMIN: string,
    IS_CLIENT: string,
    IS_SUPPORT: string,
  }

export const PermissionTypeGroup: PermissionTypeGroupInterface = {
    USER: "USER",
    USER_ADMIN: "USER_ADMIN",
};

export const Roles: RolesInterface = {
    IS_ADMIN: "IS_ADMIN",
    IS_CLIENT: "IS_CLIENT",
    IS_SUPPORT: "IS_SUPPORT",
};
