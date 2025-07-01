import { NextFunction, Request, Response } from "express"
import { CreateSourceDTO } from "./CreateSourceDTO";
import CreateSourceUseCase from "./CreateSourceUseCase";

export default class CreateSourceController {
  constructor(private createSourceUseCase: CreateSourceUseCase) {
    this.createSourceUseCase = createSourceUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        name,
        description,
        scope,
        categoryId,
        measurementUnit,
        inventoryItems,
      } = request.body as CreateSourceDTO;
      //TODO: Adicionar validação de dados

      const source = await this.createSourceUseCase.execute({
        name,
        description,
        scope,
        categoryId,
        measurementUnit,
        inventoryItems,
      });

      return response.status(200).json(source);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
