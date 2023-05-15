import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';

import { ApiResponse } from '../models';

@Injectable()
export class ApiResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        message: '',
        data,
      })),
      catchError((error) => {
        const message =
          error.message || error.response || 'Internal Server Error';

        if (error instanceof HttpException) {
          const statusCode = error.getStatus();

          const errorResponse: ApiResponse<T> = {
            success: false,
            message,
            data: null,
          };

          return throwError(new HttpException(errorResponse, statusCode));
        }

        return throwError({
          success: false,
          message,
          data: null,
        });
      }),
    );
  }
}
