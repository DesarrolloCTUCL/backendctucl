import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {

        // ✅ Si la respuesta YA tiene status, no tocarla
        if (data && (data.status === 'success' || data.status === 'error')) {
          return data;
        }

        // ✅ Caso especial: la app Android espera { status: "success", total: 157 }
        if (typeof data === 'object' && data !== null && 'total' in data) {
          return {
            status: 'success',
            ...data, // Merge: total, otros campos
          };
        }

        // ✅ Respuesta normal para todos los demás endpoints
        return {
          status: 'success',
          data,
        };
      }),
    );
  }
}
