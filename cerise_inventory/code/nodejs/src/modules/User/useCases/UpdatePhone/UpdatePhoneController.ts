import { NextFunction, Request, Response } from "express";
import UpdatePhoneUseCase from "./UpdatePhoneUseCase";

export default class UpdatePhoneController {
  constructor(private updatePhoneUseCase: UpdatePhoneUseCase) {
    this.updatePhoneUseCase = updatePhoneUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { phoneId } = request.params;
      const newData = request.body;

      const phone = await this.updatePhoneUseCase.execute(phoneId, newData);

      return response.status(200).json(phone);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
