import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SuccessResponseDto } from '@src/dtos/http-response.dto';
import { DateTime } from '@src/helpers/date-time.helper';

@Injectable()
export class HttpResponseInterceptor<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<SuccessResponseDto<T>> {
    const timestamp = DateTime.getCurrentDateTime();

    return next.handle().pipe(
      map((result) => {
        return {
          success: true,
          timestamp,
          result,
        };
      }),
    );
  }
}
