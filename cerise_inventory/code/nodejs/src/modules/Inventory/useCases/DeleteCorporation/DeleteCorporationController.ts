import { NextFunction, Request, Response } from "express";
import DeleteCorporationUseCase from "./DeleteCorporationUseCase";

export default class DeleteCorporationController {
  constructor(private deleteCorporationUseCase: DeleteCorporationUseCase) {
    this.deleteCorporationUseCase = deleteCorporationUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    const { corporationId } = request.params;

    try {
      const result = await this.deleteCorporationUseCase.execute(corporationId);
      return response.status(200).json({ message: result });
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
