import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const url = request.url;

    // ✅ excluir el endpoint exacto sin importar path o prefijos
    if (url.includes('/recharge-point/info/count')) {
      return next.handle(); // devuelve { total: 157 }
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
