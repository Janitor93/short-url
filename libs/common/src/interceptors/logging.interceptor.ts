import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LoggerService } from '@app/common';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  private sanitize(data: Record<string, string>): Record<string, string> {
    if (typeof data !== 'object') return data;
    const sensitiveFields = ['password'];
    const sanitized = { ...data };

    sensitiveFields.forEach((fieldName) => {
      if (sanitized[fieldName]) sanitized[fieldName] = '*****';
    });

    return sanitized;
  }

  private getBodyString(body: any): string {
    return `Body: ${JSON.stringify(this.sanitize(body))} `;
  }

  private getParamsString(params: any): string {
    return `Params: ${JSON.stringify(params)} `;
  }

  private getQueryString(query: any): string {
    return `Query: ${JSON.stringify(query)} `;
  }

  private getRequestData({ body, query, params }): string {
    let result = '';
    if (Object.keys(body).length !== 0) result += '| ' + this.getBodyString(body);
    if (Object.keys(query).length !== 0) result += '| ' + this.getQueryString(query);
    if (Object.keys(params).length !== 0) result += '| ' + this.getParamsString(params);
    return result;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, query, params } = request;
    const now = Date.now();

    this.logger.log(
      `Request: ${method} ${url} ${this.getRequestData({ body, query, params })}`,
    );

    return next.handle().pipe(tap((response) => {
      const responseTime = Date.now() - now;
      this.logger.log(
        `Response: ${method} ${url} | Status: success | Time: ${responseTime}ms | Response: ${JSON.stringify(this.sanitize(response))}`,
      );
    }));
  }
}
