import {Middleware} from './middleware.interface';
import {NextFunction, Request, Response} from 'express';
import {HttpError} from '../errors';
import {StatusCodes} from 'http-status-codes';

export class PrivateRouteMiddleware implements Middleware {
  public async execute({ tokenPayload }: Request, _res: Response, next: NextFunction): Promise<void> {
    if (! tokenPayload) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'PrivateRouteMiddleware'
      );
    }

    return next();
  }
}
