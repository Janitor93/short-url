import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { LoggerService } from '@app/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : 500;

    const message = exception instanceof HttpException
      ? exception.message
      : 'Internal server error';

    this.logger.error(exception);
    response
      .status(status)
      .json({
        statusCode: status,
        message: message,
      });
  }
}
