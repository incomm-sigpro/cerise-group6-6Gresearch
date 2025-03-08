import { NextFunction, Request, Response } from "express";
import GetUserUseCase from "./GetUserUseCase";

export default class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {
    this.getUserUseCase = getUserUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { userId } = request.params;
      const user = await this.getUserUseCase.execute(userId);

      return response.status(200).json(user);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
