import { NextFunction, Request, Response } from "express";
import GetUsersUseCase from "./GetUsersUseCase";

export default class GetUsersController {
  constructor(private getUsersUseCase: GetUsersUseCase) {
    this.getUsersUseCase = getUsersUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const users = await this.getUsersUseCase.execute();

      return response.status(200).json(users);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
