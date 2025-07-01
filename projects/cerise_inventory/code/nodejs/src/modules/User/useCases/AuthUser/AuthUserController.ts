import { loginSchema } from "../../../../models/joi";
import { NextFunction, Request, Response } from "express";
import { lookup } from "geoip-lite";
import AuthUserUseCase from "./AuthUserUseCase";

export default class AuthUserController {
  constructor(private authUserUseCase: AuthUserUseCase) {
    this.authUserUseCase = authUserUseCase;
  }

  async handle(request: Request, response: Response, next: NextFunction) {
    try {
      const { error } = loginSchema.validate(request.body);

      if (error) {
        return response.status(500).json(error.message);
      }

      const { email, password } = request.body;
      const {
        user,
        permissions,
        inventories,
        corporations,
        categories,
        sources,
      } = await this.authUserUseCase.execute(email.toLowerCase());
      const tokenData = await this.authUserUseCase.matchUser(user, password);

      const geodata = lookup(request.ip);

      await this.authUserUseCase.registerFirstLogin(user!.id, user!.firstLogin);

      await this.authUserUseCase.createSession(
        user!.id,
        request.ip,
        request.headers["user-agent"],
        request.headers["accept-language"],
        geodata,
      );

      const currentUser = { ...user, password: undefined };

      return response.status(200).json({
        currentUser,
        permissions,
        inventories,
        corporations,
        categories,
        sources,
        tokenData,
      });
    } catch (error) {
      console.error([__filename], { error });
      return next(error);
    }
  }
}
