import { NextFunction, Request, Response } from "express";
import { CreateUserDTO } from "./CreateUserDTO";
import CreateUserUseCase from "./CreateUserUseCase";

export default class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, email, password, isActive, birthday, role, createdBy } =
        request.body as CreateUserDTO;

      const user = await this.createUserUseCase.execute({
        name,
        email,
        password,
        isActive,
        birthday,
        role,
        createdBy,
      });

      return response.status(201).json(user);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
