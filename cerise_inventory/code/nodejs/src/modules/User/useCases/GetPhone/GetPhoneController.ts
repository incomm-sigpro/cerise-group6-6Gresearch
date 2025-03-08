import { NextFunction, Request, Response } from "express";
import GetPhoneUseCase from "./GetPhoneUseCase";

export default class GetPhoneController {
  constructor(private getPhoneUseCase: GetPhoneUseCase) {
    this.getPhoneUseCase = getPhoneUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { phoneId } = request.params;
      const phone = await this.getPhoneUseCase.execute(phoneId);

      return response.status(200).json(phone);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
