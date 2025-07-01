import { NextFunction, Request, Response } from "express";
import GetPermissionsUseCase from "./GetPermissionsUseCase";

export default class GetPermissionsController {
  constructor(private getPermissionsUseCase: GetPermissionsUseCase) {
    this.getPermissionsUseCase = getPermissionsUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { userId } = request.params;
      const user = await this.getPermissionsUseCase.execute(userId);

      return response.status(200).json(user);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
