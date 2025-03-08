import { NextFunction, Request, Response } from "express";
import UpdateMessageUseCase from "./UpdateMessageUseCase";

export default class UpdateMessageController {
  constructor(private updateMessageUseCase: UpdateMessageUseCase) {
    this.updateMessageUseCase = updateMessageUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { messageId } = request.params;
      const newData = request.body;

      const message = await this.updateMessageUseCase.execute(messageId, newData);

      return response.status(200).json(message);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
