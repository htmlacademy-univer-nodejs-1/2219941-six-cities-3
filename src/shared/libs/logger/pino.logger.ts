import {Logger as LoggerPino, pino} from 'pino';
import {Logger} from './logger.interface.js';
import {injectable} from 'inversify';

@injectable()
export class PinoLogger implements Logger {
  private readonly logger: LoggerPino;

  constructor() {
    this.logger = pino();
  }

  public info(message: string, ...args: unknown[]): void{
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void{
    this.logger.warn(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void{
    this.logger.error(error, message, ...args);
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }
}
