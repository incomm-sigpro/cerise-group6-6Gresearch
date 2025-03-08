import { NextFunction, Request, Response } from "express"
import { CreateMessageDTO } from "./CreateMessageDTO";
import CreateMessageUseCase from "./CreateMessageUseCase";

export default class CreateMessageController {
  constructor(private createMessageUseCase: CreateMessageUseCase) {
    this.createMessageUseCase = createMessageUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        title,
        content,
        type,
        user,
        userId
      } = request.body as CreateMessageDTO;
      //TODO: Adicionar validação de dados
  
      const message = await this.createMessageUseCase.execute({
        title,
        content,
        type,
        user,
        userId
      });
  
      return response.status(200).json(message);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}