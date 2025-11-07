import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const { method, url } = req;
    const start = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - start;
          console.log(`[LOG] ${method} ${url} — ${duration}ms`);
        },
        error: (err) => {
          const duration = Date.now() - start;
          console.log(`[LOG] ${method} ${url} — ERROR after ${duration}ms`);
        }
      })
    );
  }
}
