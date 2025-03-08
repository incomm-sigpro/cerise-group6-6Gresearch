import { NextFunction, Request, Response } from "express"
import { CreateUserCorporationDTO } from "./CreateUserCorporationDTO";
import CreateUserCorporationUseCase from "./CreateUserCorporationUseCase";

export default class CreateUserCorporationController {
  constructor(private createUserCorporationUseCase: CreateUserCorporationUseCase) {
    this.createUserCorporationUseCase = createUserCorporationUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        user,
        userId,
        corporation,
        corporationId,
      } = request.body as CreateUserCorporationDTO;

      const userCorporation = await this.createUserCorporationUseCase.execute({
        user,
        userId,
        corporation,
        corporationId,
      });

      return response.status(201).json(userCorporation);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}