import {inject, injectable} from 'inversify';
import {
  Controller, HttpError,
  HttpMethod, PrivateRouteMiddleware,
  RequestBody,
  RequestParams,
  ValidateDtoMiddleware
} from '../../libs/application';
import {Component} from '../../../types';
import {Logger} from '../../libs/logger';
import {CommentService} from './comment-service.interface';
import {OfferService} from '../offer';
import {Request, Response} from 'express';
import {CreateCommentDto} from './dto/create-comment.dto';
import {fillDTO} from '../../helpers';
import {CommentRdo} from './rdo/comment.rdo';
import {StatusCodes} from 'http-status-codes';
import {UserService} from '../user';

@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.UserService) private readonly userService: UserService
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto)
      ]});
  }

  public async create({ body, tokenPayload }: Request<RequestParams, RequestBody, CreateCommentDto>, res: Response): Promise<void> {
    const { userId, offerId } = body;

    if (! await this.offerService.exists(offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'CommentController'
      );
    }

    if (! await this.userService.findById(userId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `User with id ${userId} not found.`,
        'CommentController'
      );
    }

    const result = await this.commentService.create({ ...body, userId: tokenPayload.id });
    await this.offerService.incCommentCount(body.offerId);
    this.created(res, fillDTO(CommentRdo, result));
  }
}
