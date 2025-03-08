import { NextFunction, Request, Response } from "express";
import GetContactsUseCase from "./GetContactsUseCase";

export default class GetContactsController {
  constructor(private getContactsUseCase: GetContactsUseCase) {
    this.getContactsUseCase = getContactsUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { userId } = request.query;

      if (typeof userId === 'string') {
        const contacts = await this.getContactsUseCase.execute(userId);
        return response.status(200).json(contacts);
      } else {
        return response.status(400).json({ message: "UserId inválido" });
      }
      
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
