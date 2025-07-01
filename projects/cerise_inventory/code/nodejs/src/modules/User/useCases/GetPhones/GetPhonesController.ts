import { NextFunction, Request, Response } from "express";
import GetPhonesUseCase from "./GetPhonesUseCase";

export default class GetPhonesController {
  constructor(private getPhonesUseCase: GetPhonesUseCase) {
    this.getPhonesUseCase = getPhonesUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { userId } = request.query;

      if (typeof userId === 'string') {
        const phones = await this.getPhonesUseCase.execute(userId);
        return response.status(200).json(phones);
      } else {
        return response.status(400).json({ message: "UserId inválido" });
      }
      
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
