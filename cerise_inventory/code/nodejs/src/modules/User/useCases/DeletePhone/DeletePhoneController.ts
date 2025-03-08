import { NextFunction, Request, Response } from "express";
import DeletePhoneUseCase from "./DeletePhoneUseCase";

export default class DeletePhoneController {
  constructor(private deletePhoneUseCase: DeletePhoneUseCase) {
    this.deletePhoneUseCase = deletePhoneUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    const { phoneId } = request.params;

    try {
      const result = await this.deletePhoneUseCase.execute(phoneId);
      return response.status(204).json({ message: result });
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
