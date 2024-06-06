import {ClassConstructor, plainToInstance} from 'class-transformer';
import {Error} from 'mongoose';
import {ValidationError } from 'class-validator';
import {ApplicationError, ValidationErrorField} from '../libs/application';

export function generateRandomValue(min: number, max: number, numAfterDigit = 0) {
  return +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[]):T[] {
  const start = generateRandomValue(0, items.length - 1);
  const end = start + generateRandomValue(start, items.length);
  return items.slice(start, end);
}

export function getRandomItem<T>(items: T[]):T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function fillDTO<T, V>(someDTO: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDTO, plainObject, { excludeExtraneousValues: true});
}

export function createErrorObject(errorType: ApplicationError, error: string, details: ValidationErrorField[] = []) {
  return {errorType, error, details};
}

export function reduceValidationErrors(errors: ValidationError[]): ValidationErrorField[] {
  return errors.map(({property, value, constraints}) => ({
    property,
    value,
    message: constraints ? Object.values(constraints) : []
  }));
}

export function getFullSreverPath(host: string, port: number) {
  return `http://${host}:${port}`;
}
