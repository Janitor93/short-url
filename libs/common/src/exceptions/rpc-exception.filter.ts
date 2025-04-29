import {
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { LoggerService } from '@app/common';
import { throwError } from 'rxjs';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: RpcException) {
    const errorMessage = exception.message;
    this.logger.error(errorMessage);
    return throwError(() => exception.getError());
  }
}
