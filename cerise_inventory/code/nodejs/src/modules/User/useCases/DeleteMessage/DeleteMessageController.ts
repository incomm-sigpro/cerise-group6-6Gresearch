import { NextFunction, Request, Response } from "express";
import DeleteMessageUseCase from "./DeleteMessageUseCase";

export default class DeleteMessageController {
  constructor(private deleteMessageUseCase: DeleteMessageUseCase) {
    this.deleteMessageUseCase = deleteMessageUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    const { messageId } = request.params;

    try {
      const result = await this.deleteMessageUseCase.execute(messageId);
      return response.status(200).json({ message: result });
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
