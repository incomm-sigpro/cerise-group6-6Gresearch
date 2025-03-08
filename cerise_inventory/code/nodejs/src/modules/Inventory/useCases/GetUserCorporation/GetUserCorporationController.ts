import { NextFunction, Request, Response } from "express";
import GetUserCorporationUseCase from "./GetUserCorporationUseCase";

export default class GetUserCorporationController {
  constructor(private getUserCorporationUseCase: GetUserCorporationUseCase) {
    this.getUserCorporationUseCase = getUserCorporationUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { userCorporationId } = request.params;
      const userCorporation = await this.getUserCorporationUseCase.execute(userCorporationId);

      return response.status(200).json(userCorporation);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
