import { NextFunction, Request, Response } from "express";
import UpdateAddressUseCase from "./UpdateAddressUseCase";

export default class UpdateAddressController {
  constructor(private updateAddressUseCase: UpdateAddressUseCase) {
    this.updateAddressUseCase = updateAddressUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { addressId } = request.params;
      const newData = request.body;

      const address = await this.updateAddressUseCase.execute(addressId, newData);

      return response.status(200).json(address);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
