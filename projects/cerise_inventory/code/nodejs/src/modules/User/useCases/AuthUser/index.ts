import { getPrisma } from "../../../../db/prisma";
import AuthUserController from "./AuthUserController";
import AuthUserUseCase from "./AuthUserUseCase";
import SessionRepository from "../../../../modules/User/repositories/SessionRepository";
import UserRepository from "../../../../modules/User/repositories/UserRepository";
import PermissionsRepository from "../../repositories/PermissionRepository";
import InventoryRepository from "../../../../modules/Inventory/repositories/InventoryRepository";
import CorporationRepository from "../../../../modules/Inventory/repositories/CorporationRepository";
import CategoryRepository from "../../../../modules/Inventory/repositories/CategoryRepository";

export default async function AuthUser() {
  const prisma = await getPrisma();

  const authUserRepository = new UserRepository(prisma);
  const sessionRepository = new SessionRepository(prisma);
  const permissionsRepository = new PermissionsRepository(prisma);
  const inventoryRepository = new InventoryRepository(prisma);
  const corporationRepository = new CorporationRepository(prisma);
  const categoryRepository = new CategoryRepository(prisma);

  const authUserUseCase = new AuthUserUseCase(
    authUserRepository,
    sessionRepository,
    permissionsRepository,
    inventoryRepository,
    corporationRepository,
    categoryRepository,
  );

  const authUserController = new AuthUserController(authUserUseCase);

  return { authUserUseCase, authUserController };
}
