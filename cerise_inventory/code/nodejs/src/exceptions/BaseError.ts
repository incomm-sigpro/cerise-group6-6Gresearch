import { HttpExceptionEnum } from "./index";

export default class BaseError extends Error {
  public message: string;

  public errors: any;

  public status: number;

  constructor(message?: string, errors?: any, status = 500) {
    super(message);
    this.message = message || HttpExceptionEnum.INTERNAL_ERROR;
    this.errors = errors || {};
    this.status = status;
  }
}
