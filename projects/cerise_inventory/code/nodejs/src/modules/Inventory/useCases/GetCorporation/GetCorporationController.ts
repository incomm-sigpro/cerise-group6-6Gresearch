import { NextFunction, Request, Response } from "express";
import GetCorporationUseCase from "./GetCorporationUseCase";

export default class GetCorporationController {
  constructor(private getCorporationUseCase: GetCorporationUseCase) {
    this.getCorporationUseCase = getCorporationUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { corporationId } = request.params;
      const corporation =
        await this.getCorporationUseCase.execute(corporationId);

      return response.status(200).json(corporation);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
