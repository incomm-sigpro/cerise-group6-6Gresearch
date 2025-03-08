import { NextFunction, Request, Response } from "express";
import DeleteUserUseCase from "./DeleteUserUseCase";

export default class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {
    this.deleteUserUseCase = deleteUserUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.params;

    try {
      const result = await this.deleteUserUseCase.execute(userId);
      return response.status(200).json({ message: result });
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
