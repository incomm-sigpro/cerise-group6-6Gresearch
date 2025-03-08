import { NextFunction, Request, Response } from "express";
import GetSourcesUseCase from "./GetSourcesUseCase";

export default class GetSourcesController {
  constructor(private getSourcesUseCase: GetSourcesUseCase) {
    this.getSourcesUseCase = getSourcesUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const Sources = await this.getSourcesUseCase.execute();

      return response.status(200).json(Sources);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
