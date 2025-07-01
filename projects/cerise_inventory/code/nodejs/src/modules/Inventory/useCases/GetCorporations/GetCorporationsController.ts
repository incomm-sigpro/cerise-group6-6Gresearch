import { NextFunction, Request, Response } from "express";
import GetCorporationsUseCase from "./GetCorporationsUseCase";

export default class GetCorporationsController {
  constructor(private getCorporationsUseCase: GetCorporationsUseCase) {
    this.getCorporationsUseCase = getCorporationsUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const corporations = await this.getCorporationsUseCase.execute();

      return response.status(200).json(corporations);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
