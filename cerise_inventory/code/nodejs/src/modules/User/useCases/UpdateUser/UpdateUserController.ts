import { NextFunction, Request, Response } from "express";
import UpdateUserUseCase from "./UpdateUserUseCase";

export default class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {
    this.updateUserUseCase = updateUserUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { userId } = request.params;
      const newData = request.body;

      const user = await this.updateUserUseCase.execute(userId, newData);

      return response.status(200).json(user);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
