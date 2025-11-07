import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Si ya viene estandarizado, lo dejamos tal cual
        if (data && (data.status === 'success' || data.status === 'error')) {
          return data;
        }
        return {
          status: 'success',
          data,
        };
      }),
    );
  }
}
