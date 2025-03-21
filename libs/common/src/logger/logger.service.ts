import { Injectable } from '@nestjs/common';
import { createLogger, format, transports, Logger } from 'winston';

@Injectable()
export class LoggerService {
  private logger: Logger;

  constructor(serviceName: string) {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.json(),
        format.printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level}] [${serviceName}]: ${message}`;
        }),
      ),
      transports: [new transports.Console()],
    });
  }

  log(message: string): void {
    this.logger.info(message);
  }

  warn(message: string | Error): void {
    this.logger.warn(message);
  }

  error(message: string | Error): void {
    this.logger.error(message);
  }
}
