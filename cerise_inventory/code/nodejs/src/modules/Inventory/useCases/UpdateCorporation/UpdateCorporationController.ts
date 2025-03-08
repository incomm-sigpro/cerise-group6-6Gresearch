import { NextFunction, Request, Response } from "express";
import UpdateCorporationUseCase from "./UpdateCorporationUseCase";

export default class UpdateCorporationController {
  constructor(private updateCorporationUseCase: UpdateCorporationUseCase) {
    this.updateCorporationUseCase = updateCorporationUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { corporationId } = request.params;
      const newData = request.body;

      const corporation = await this.updateCorporationUseCase.execute(corporationId, newData);

      return response.status(200).json(corporation);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
