import { NextFunction, Request, Response } from "express";
import UpdateContactUseCase from "./UpdateContactUseCase";

export default class UpdateContactController {
  constructor(private updateContactUseCase: UpdateContactUseCase) {
    this.updateContactUseCase = updateContactUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { ContactId } = request.params;
      const newData = request.body;

      const Contact = await this.updateContactUseCase.execute(ContactId, newData);

      return response.status(200).json(Contact);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
