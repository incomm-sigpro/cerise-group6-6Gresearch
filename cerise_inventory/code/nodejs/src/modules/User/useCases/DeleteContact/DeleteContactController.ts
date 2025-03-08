import { NextFunction, Request, Response } from "express";
import DeleteContactUseCase from "./DeleteContactUseCase";

export default class DeleteContactController {
  constructor(private deleteContactUseCase: DeleteContactUseCase) {
    this.deleteContactUseCase = deleteContactUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    const { contactId } = request.params;

    try {
      const result = await this.deleteContactUseCase.execute(contactId);
      return response.status(200).json({ message: result });
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
