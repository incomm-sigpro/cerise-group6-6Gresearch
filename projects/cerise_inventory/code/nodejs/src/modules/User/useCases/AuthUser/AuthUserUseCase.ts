import { ISessionRepository } from "../../../../modules/User/repositories/interfaces/ISessionRepository";
import { IUserRepository } from "../../../../modules/User/repositories/interfaces/IUserRepository";
import { IPermissionsRepository } from "../../repositories/interfaces/IPermissionsRepository";
import { IInventoryRepository } from "../../../../modules/Inventory/repositories/interfaces/IInventoryRepository";
import { ICorporationRepository } from "../../../../modules/Inventory/repositories/interfaces/ICorporationRepository";
import { ICategoryRepository } from "../../../../modules/Inventory/repositories/interfaces/ICategoryRepository";
import { AuthExceptionEnum, HttpExceptionEnum } from "../../../../exceptions";
import ValidationException from "../../../../exceptions/ValidationException";

import generateJWT from "../../../../utils/jwt";
import { User } from "@prisma/client";
import argon2id from "argon2";
import { Lookup } from "geoip-lite";

export default class AuthUserUseCase {
  private userRepository: IUserRepository;
  private sessionRepository: ISessionRepository;
  private permissionsRepository: IPermissionsRepository;
  private inventoryRepository: IInventoryRepository;
  private corporationRepository: ICorporationRepository;
  private categoryRepository: ICategoryRepository;

  constructor(
    userRepository: IUserRepository,
    sessionRepository: ISessionRepository,
    permissionsRepository: IPermissionsRepository,
    inventoryRepository: IInventoryRepository,
    corporationRepository: ICorporationRepository,
    categoryRepository: ICategoryRepository,
  ) {
    this.userRepository = userRepository;
    this.sessionRepository = sessionRepository;
    this.permissionsRepository = permissionsRepository;
    this.inventoryRepository = inventoryRepository;
    this.corporationRepository = corporationRepository;
    this.categoryRepository = categoryRepository;
  }

  async execute(login: string) {
    const user = await this.userRepository.authenticate(login);

    if (user) {
      const permissions = await this.permissionsRepository.getByUserId(user.id);
      const inventories = await this.inventoryRepository.getAllInventories();
      const corporations = await this.corporationRepository.getByUserId(
        user.id,
      );

      let corporationInventories: any[] = [];

      if (inventories && corporations) {
        corporationInventories = inventories.filter((inventory) => {
          return corporations.some((corporation) => {
            return corporation.id === inventory.corporationId;
          });
        });
      } else {
        corporationInventories = [];
      }

      const categories = await this.categoryRepository.getAllCategories();
      return {
        user,
        permissions,
        inventories: corporationInventories,
        corporations,
        categories,
      };
    } else {
      return {
        user,
        permissions: null,
        inventories: null,
        corporations: null,
        categories: null,
        sources: null,
      };
    }
  }

  public async matchUser(user: User | null, password: string) {
    if (!user) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Usuário não encontrado.`,
        },
        404,
      );
    }

    const passMatch = await argon2id.verify(user.password, password);
    if (!passMatch) {
      throw new ValidationException(
        AuthExceptionEnum.INVALID_CREDENTIALS,
        {
          message: `Credenciais invalidas.`,
        },
        404,
      );
    }

    return generateJWT(user.id);
  }

  public async registerFirstLogin(userId: string, firstLogin: Date | null) {
    if (!firstLogin) {
      await this.userRepository.setFirstLoginDate(userId);
    }
  }

  public createSession(
    userId: string,
    ip: string,
    userAgent?: string,
    language?: string,
    geodata?: Lookup | null,
  ) {
    return this.sessionRepository.add(userId, ip, userAgent, language, geodata);
  }
}
