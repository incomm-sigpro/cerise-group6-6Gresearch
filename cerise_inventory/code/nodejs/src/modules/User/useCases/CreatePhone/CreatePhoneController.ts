import { NextFunction, Request, Response } from "express"
import { CreatePhoneDTO } from "./CreatePhoneDTO";
import CreatePhoneUseCase from "./CreatePhoneUseCase";

export default class CreatePhoneController {
  constructor(private createPhoneUseCase: CreatePhoneUseCase) {
    this.createPhoneUseCase = createPhoneUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        type,
        number,
        user,
        userId
      } = request.body as CreatePhoneDTO;
  
      const phone = await this.createPhoneUseCase.execute({
        type,
        number,
        user,
        userId
      });
  
      return response.status(201).json(phone);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}