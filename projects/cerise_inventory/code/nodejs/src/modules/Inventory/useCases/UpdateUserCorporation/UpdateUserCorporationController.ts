import { NextFunction, Request, Response } from "express";
import UpdateUserCorporationUseCase from "./UpdateUserCorporationUseCase";

export default class UpdateUserCorporationController {
  constructor(private updateUserCorporationUseCase: UpdateUserCorporationUseCase) {
    this.updateUserCorporationUseCase = updateUserCorporationUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { userCorporationId } = request.params;
      const newData = request.body;

      const userCorporation = await this.updateUserCorporationUseCase.execute(userCorporationId, newData);

      return response.status(200).json(userCorporation);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
