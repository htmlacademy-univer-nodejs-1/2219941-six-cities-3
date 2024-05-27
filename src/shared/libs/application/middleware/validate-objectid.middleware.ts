import {Middleware} from './middleware.interface';
import {NextFunction, Request, Response} from 'express';
import { Types } from 'mongoose';
import {HttpError} from '../errors';
import {StatusCodes} from 'http-status-codes';

export class ValidateObjectidMiddleware implements Middleware {
  constructor(private param: string) {}

  public execute({ params }: Request, _res: Response, next: NextFunction): void {
    const objectId = params[this.param];

    if (Types.ObjectId.isValid(objectId)) {
      return next();
    }

    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      `${objectId} is invalid ObjectID`,
      'ValidateObjectIdMiddleware'
    );
  }
}
