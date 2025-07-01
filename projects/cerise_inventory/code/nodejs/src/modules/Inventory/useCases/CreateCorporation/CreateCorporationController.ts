import { NextFunction, Request, Response } from "express"
import { CreateCorporationDTO } from "./CreateCorporationDTO";
import CreateCorporationUseCase from "./CreateCorporationUseCase";

export default class CreateCorporationController {
  constructor(private createCorporationUseCase: CreateCorporationUseCase) {
    this.createCorporationUseCase = createCorporationUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const {
        name,
        cnpj,
        energyConsumption,
        airConditioners,
        computers,
        employeeTransportation,
        mainActivity,
        suppliers,
        wasteGeneration,
        userCorporation,
        inventories,
      } = request.body as CreateCorporationDTO;

      const corporation = await this.createCorporationUseCase.execute({
        name,
        cnpj,
        energyConsumption,
        airConditioners,
        computers,
        employeeTransportation,
        mainActivity,
        suppliers,
        wasteGeneration,
        userCorporation,
        inventories,
      });

      return response.status(201).json(corporation);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}