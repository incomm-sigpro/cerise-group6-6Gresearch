import { NextFunction, Request, Response } from "express";
import GetAddressUseCase from "./GetAddressUseCase";

export default class GetAddressController {
  constructor(private getAddressUseCase: GetAddressUseCase) {
    this.getAddressUseCase = getAddressUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { addressId } = request.params;
      const address = await this.getAddressUseCase.execute(addressId);

      return response.status(200).json(address);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
