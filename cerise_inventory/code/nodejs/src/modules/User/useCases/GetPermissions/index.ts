import { getPrisma } from "../../../../db/prisma";
import UserRepository from "../../../../modules/User/repositories/UserRepository";
import GetPermissionsController from "./GetPermissionsController";
import GetPermissionsUseCase from "./GetPermissionsUseCase";
import PermissionsRepository from "../../repositories/PermissionRepository";

export default async function GetUser() {
  const prisma = await getPrisma();

  const permissionsRepository = new PermissionsRepository(prisma);

  const getPermissionsUseCase = new GetPermissionsUseCase(
    permissionsRepository,
  );
  const getPermissionsController = new GetPermissionsController(
    getPermissionsUseCase,
  );

  return { getPermissionsUseCase, getPermissionsController };
}
