import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const url = request.url;

    // ✅ NO modificar este endpoint específico
    if (url.includes('/recharge-point/info/count')) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) => {
        // Si ya tiene "status", respetarlo
        if (data && (data.status === 'success' || data.status === 'error')) {
          return data;
        }

        // Respuesta general
        return {
          status: 'success',
          data,
        };
      }),
    );
  }
}
