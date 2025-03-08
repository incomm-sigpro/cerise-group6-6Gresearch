import BaseError from "./BaseError";
import { HttpExceptionEnum, HttpExceptionStatusCodeEnum } from "./index";

export default class UnauthorizedException extends BaseError {
  public message: string;

  public errors: any;

  public status: number;

  constructor(
    message?: string,
    errors?: any,
    status = HttpExceptionStatusCodeEnum.UNAUTHORIZED
  ) {
    super(message);
    this.message = message || HttpExceptionEnum.UNAUTHORIZED;
    this.errors = errors || {};
    this.status = status;
  }
}
