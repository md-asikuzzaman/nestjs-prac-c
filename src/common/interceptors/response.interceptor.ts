import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { RESPONSE_MESSAGE } from '../decorators/response-message.decorator';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();

    const message =
      this.reflector.get<string>(RESPONSE_MESSAGE, context.getHandler()) ??
      'Success';

    return next.handle().pipe(
      map((data) => ({
        success: true,

        statusCode: response.statusCode,

        message,

        data,
      })),
    );
  }
}
