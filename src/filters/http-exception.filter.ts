import {
  ArgumentsHost,
  Catch,
  ExceptionFilter, HttpStatus,
  UnprocessableEntityException
} from "@nestjs/common";
import { Response } from 'express';
import { Reflector } from '@nestjs/core';
import _ from 'lodash';
import { STATUS_CODES } from 'http';
import { ValidationError } from "class-validator";

@Catch(UnprocessableEntityException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(public reflector: Reflector) {}

  catch(exception: UnprocessableEntityException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    let statusCode = +exception.getStatus();

    // eslint-disable-next-line prefer-const
    const r = exception.getResponse() as any;

    if (_.isArray(r.message) && r.message[0] instanceof ValidationError) {
      statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
      r.error = STATUS_CODES[statusCode];
      const validationErrors = r.message as ValidationError[];
      this.validationFilter(validationErrors);
    }

    r.success = false
    r.statusCode = statusCode;
    r.errorType = STATUS_CODES[statusCode];

    response.status(statusCode).json(r);
  }

  private validationFilter(validationErrors: ValidationError[]): void {
    for (const validationError of validationErrors) {
      if (!_.isEmpty(validationError.children)) {
        this.validationFilter(validationError.children);
        return;
      }

      for (const [constraintKey, constraint] of Object.entries(
        validationError.constraints,
      )) {
        // convert default messages
        if (!constraint) {
          // convert error message to error.fields.{key} syntax for i18n translation
          validationError.constraints[
            constraintKey
            ] = `error.fields.${_.snakeCase(constraintKey)}`;
        }
      }
    }
  }
}
