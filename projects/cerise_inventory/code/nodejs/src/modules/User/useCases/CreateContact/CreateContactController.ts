import { NextFunction, Request, Response } from "express"
import { CreateContactDTO } from "./CreateContactDTO";
import CreateContactUseCase from "./CreateContactUseCase";

export default class CreateContactController {
  constructor(private createContactUseCase: CreateContactUseCase) {
    this.createContactUseCase = createContactUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        name,
        email,
        telephone,
        user,
        userId
      } = request.body as CreateContactDTO;
      //TODO: Adicionar validação de dados
  
      const contact = await this.createContactUseCase.execute({
        name,
        email,
        telephone,
        user,
        userId
      });
  
      return response.status(200).json(contact);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}