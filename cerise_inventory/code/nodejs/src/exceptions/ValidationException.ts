import BaseError from "./BaseError";
import { HttpExceptionEnum } from "./index";

export default class ValidationException extends BaseError {
  public message: string;

  public errors: any;

  public status: number;

  constructor(message?: string, errors?: any, status = 422) {
    super(message);
    this.message = message || HttpExceptionEnum.UNPROCESSED_ENTITY;
    this.errors = errors || {};
    this.status = status;
  }
}
