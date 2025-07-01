import { NextFunction, Request, Response } from "express";
import DeleteAddressUseCase from "./DeleteAddressUseCase";

export default class DeleteAddressController {
  constructor(private deleteAddressUseCase: DeleteAddressUseCase) {
    this.deleteAddressUseCase = deleteAddressUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    const { addressId } = request.params;

    try {
      // TODO: verificar se o delete do prisma retorna algo
      const result = await this.deleteAddressUseCase.execute(addressId);
      return response.status(204).json({ success: result });
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
