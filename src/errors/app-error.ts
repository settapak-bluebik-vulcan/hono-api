import type { ContentfulStatusCode } from "hono/utils/http-status";

export class AppError extends Error {
  constructor(
    public statusCode: ContentfulStatusCode,
    public message: string,
  ) {
    super(message);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = "Bad request") {
    super(400, message);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = "Resource not found") {
    super(404, message);
  }
}

export class UnprocessableError extends AppError {
  constructor(message: string = "Unprocessable entity") {
    super(422, message);
  }
}
