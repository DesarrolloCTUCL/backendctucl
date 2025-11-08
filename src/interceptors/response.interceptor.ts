import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const url = request.url;

    // ✅ EXCEPCIONES – Android necesita formato especial
    if (
      url.includes('/recharge-point/info/count') ||
      url === '/api/recharge-point'
    ) {
      return next.handle(); // <-- no tocar la respuesta
    }

    return next.handle().pipe(
      map((data) => {
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

