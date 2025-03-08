import { NextFunction, Request, Response } from "express";
import DeleteUserCorporationUseCase from "./DeleteUserCorporationUseCase";

export default class DeleteUserCorporationController {
  constructor(private deleteUserCorporationUseCase: DeleteUserCorporationUseCase) {
    this.deleteUserCorporationUseCase = deleteUserCorporationUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    const { userCorporationId } = request.params;

    try {
      const result = await this.deleteUserCorporationUseCase.execute(userCorporationId);
      return response.status(200).json({ message: result });
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
