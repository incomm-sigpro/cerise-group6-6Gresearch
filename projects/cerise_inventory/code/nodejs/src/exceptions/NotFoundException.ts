import BaseError from "./BaseError";
import { HttpExceptionEnum } from "./index";

export default class NotFoundException extends BaseError {
  public message: string;

  public errors: any;

  public status: number;

  constructor(message?: string, errors?: any, status = 404) {
    super(message);
    this.message = message || HttpExceptionEnum.BAD_REQUEST;
    this.errors = errors || {};
    this.status = status;
  }
}
