import {Logger} from './logger.interface.js';
import {Error} from 'mongoose';
import {getErrorMessage} from '../../helpers/index.js';

export class ConsoleLogger implements Logger {
  public info(message: string, ...args: unknown[]) {
    console.info(message, ...args);
  }

  public debug(message: string, ...args: unknown[]) {
    console.debug(message, ...args);
  }

  public warn(message: string, ...args: unknown[]) {
    console.warn(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]) {
    console.error(message, ...args);
    console.error(`Error message: ${getErrorMessage(error)}`);
  }
}
