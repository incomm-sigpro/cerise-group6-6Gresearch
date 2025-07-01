import BaseError from "./BaseError";
import { HttpExceptionEnum } from "./index";

export default class BadRequestException extends BaseError {
  public message: string;

  public errors: any;

  public status: number;

  constructor(message?: string, errors?: any, status = 400) {
    super(message);
    this.message = message || HttpExceptionEnum.BAD_REQUEST;
    this.errors = errors || {};
    this.status = status;
  }
}
