import { NextFunction, Request, Response } from "express";
import UpdateSourceUseCase from "./UpdateSourceUseCase";

export default class UpdateSourceController {
  constructor(private updateSourceUseCase: UpdateSourceUseCase) {
    this.updateSourceUseCase = updateSourceUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { sourceId } = request.params;
      const newData = request.body;

      const source = await this.updateSourceUseCase.execute(sourceId, newData);

      return response.status(200).json(source);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
