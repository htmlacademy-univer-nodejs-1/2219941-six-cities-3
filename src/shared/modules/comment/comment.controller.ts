import {inject, injectable} from 'inversify';
import {
  Controller,
  HttpError,
  HttpMethod,
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
import {StatusCodes} from 'http-status-codes';
import {fillDTO} from '../../helpers';
import {CommentRdo} from './rdo/comment.rdo';

@injectable()
export default class CommentController extends Controller {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController…');
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateCommentDto)]
    });
  }

  public async create({ body }: Request<RequestParams, RequestBody, CreateCommentDto>, res: Response): Promise<void> {
    const { offerId } = body;
    if(! await this.offerService.exists(offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${offerId} not found.`,
        'CommentController'
      );
    }

    const result = await this.commentService.create(body);
    await this.offerService.incCommentCount(body.offerId);
    this.created(res, fillDTO(CommentRdo, result));
  }
}
