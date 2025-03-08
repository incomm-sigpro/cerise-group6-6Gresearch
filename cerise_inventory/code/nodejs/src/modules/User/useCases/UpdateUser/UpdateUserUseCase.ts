import { User } from "@prisma/client";
import { IUserRepository } from "../../../../modules/User/repositories/interfaces/IUserRepository";
import { IPhoneRepository } from "../../../../modules/User/repositories/interfaces/IPhoneRepository";
import argon2id from "argon2";
import ValidationException from "../../../../exceptions/ValidationException";
import { AuthExceptionEnum, HttpExceptionEnum } from "../../../../exceptions";

export default class UpdateUserUseCase {
  private userRepository: IUserRepository;
  private phoneRepository: IPhoneRepository;

  constructor(
    userRepository: IUserRepository,
    phoneRepository: IPhoneRepository,
  ) {
    this.userRepository = userRepository;
    this.phoneRepository = phoneRepository;
  }

  async execute(userId: string, updatedUserData: any) {
    const existingUser: any = await this.userRepository.getById(userId);
    const existingPhones: any = await this.phoneRepository.getByUserId(userId);
    let newUserInfo: any = {};

    if (!existingUser) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Usuário não encontrado.`,
        },
        404,
      );
    }

    if (!existingPhones) {
      throw new ValidationException(
        HttpExceptionEnum.NOT_FOUND,
        {
          message: `Telefones não encontrados`,
        },
        404,
      );
    }

    if (updatedUserData.newPassword) {
      if (!updatedUserData.oldPassword) {
        throw new ValidationException(
          HttpExceptionEnum.NOT_FOUND,
          {
            message: `Senha atual obrigatória.`,
          },
          404,
        );
      }

      const isPasswordValid = await argon2id.verify(
        existingUser.password,
        updatedUserData.oldPassword,
      );

      if (!isPasswordValid) {
        throw new ValidationException(
          AuthExceptionEnum.INVALID_CREDENTIALS,
          {
            message: `Senha inválida.`,
          },
          404,
        );
      }
    }

    for (const key of Object.keys(updatedUserData)) {
      if (key === "newPassword") {
        newUserInfo["password"] = await argon2id.hash(updatedUserData[key]);
      } else if (key === "oldPassword") {
        continue;
      } else if (key.includes("Phone")) {
        const phoneType = key.toUpperCase();
        switch (phoneType) {
          case "HOMEPHONE":
            const homePhone = existingPhones.find(
              (phone: any) => phone.type === "HOME",
            );
            homePhone
              ? await this.phoneRepository.update(homePhone.id, {
                  number: updatedUserData[key],
                })
              : await this.phoneRepository.create({
                  type: "HOME",
                  number: updatedUserData[key],
                  user: existingUser,
                  userId,
                });
            break;
          case "WORKPHONE":
            const workPhone = existingPhones.find(
              (phone: any) => phone.type === "WORK",
            );
            workPhone
              ? await this.phoneRepository.update(workPhone.id, {
                  number: updatedUserData[key],
                })
              : await this.phoneRepository.create({
                  type: "WORK",
                  number: updatedUserData[key],
                  user: existingUser,
                  userId,
                });
            break;
          case "MOBILEPHONE":
            const mobilePhone = existingPhones.find(
              (phone: any) => phone.type === "MOBILE",
            );
            mobilePhone
              ? await this.phoneRepository.update(mobilePhone.id, {
                  number: updatedUserData[key],
                })
              : await this.phoneRepository.create({
                  type: "MOBILE",
                  number: updatedUserData[key],
                  user: existingUser,
                  userId,
                });
            break;
          default:
            // Lidar com chaves de telefone desconhecidas, se necessário.
            break;
        }
      } else {
        newUserInfo[key] = updatedUserData[key];
      }
    }
    let updatedUser;
    if (Object.keys(newUserInfo).length > 0) {
      updatedUser = await this.userRepository.update(userId, newUserInfo);
    } else {
      updatedUser = { message: "Não foram informados dados!" };
    }

    return updatedUser;
  }
}
