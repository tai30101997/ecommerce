import { ErrorInfo, HttpErrorInput } from "./Type";

export class HttpError extends Error {
  status: number;
  errors?: ErrorInfo[];
  constructor(option: HttpErrorInput) {
    super(option.message);
    this.status = option.status;
    if (option.errors) {
      this.errors = option.errors;
    }
  }
}