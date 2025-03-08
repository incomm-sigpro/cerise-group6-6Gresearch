import { NextFunction, Request, Response } from "express";
import UpdateUserAvatarUseCase from "./UpdateUserAvatarUseCase";

export default class UpdateUserAvatarController {
  constructor(private updateUserAvatarUseCase: UpdateUserAvatarUseCase) {
    this.updateUserAvatarUseCase = updateUserAvatarUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {

      if (!request.file) {
        return response.status(400).json({ error: 'Arquivo não disponível' });
      }
      
      const { userId } = request.params;
      const avatarFilename: string = request.file.filename;

      const user = await this.updateUserAvatarUseCase.execute(userId, avatarFilename);

      return response.status(200).json(user);
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
