import { NextFunction, Request, Response } from "express";
import GetMessagesUseCase from "./GetMessagesUseCase";

export default class GetMessagesController {
  constructor(private getMessagesUseCase: GetMessagesUseCase) {
    this.getMessagesUseCase = getMessagesUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { userId } = request.query;

      if (typeof userId === 'string') {
        const messages = await this.getMessagesUseCase.execute(userId);
        return response.status(200).json(messages);
      } else {
        return response.status(400).json({ message: "UserId inválido" });
      }
      
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
