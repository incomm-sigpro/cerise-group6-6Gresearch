import { NextFunction, Request, Response } from "express";
import GetSourceUseCase from "./GetSourceUseCase";

export default class GetSourceController {
  constructor(private getSourceUseCase: GetSourceUseCase) {
    this.getSourceUseCase = getSourceUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { sourceId } = request.params;
      const source = await this.getSourceUseCase.execute(sourceId);

      return response.status(200).json(source);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
