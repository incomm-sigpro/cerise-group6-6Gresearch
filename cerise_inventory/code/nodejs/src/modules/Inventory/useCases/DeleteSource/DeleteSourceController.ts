import { NextFunction, Request, Response } from "express";
import DeleteSourceUseCase from "./DeleteSourceUseCase";

export default class DeleteSourceController {
  constructor(private deleteSourceUseCase: DeleteSourceUseCase) {
    this.deleteSourceUseCase = deleteSourceUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    const { sourceId } = request.params;

    try {
      const result = await this.deleteSourceUseCase.execute(sourceId);
      return response.status(200).json({ message: result });
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
