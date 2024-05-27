import {inject, injectable} from 'inversify';
import {
  Controller, DocumentExistMiddleware,
  HttpMethod, PrivateRouteMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectidMiddleware
} from '../../libs/application/index.js';
import {Component} from '../../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {Request, Response} from 'express';
import {OfferService} from './offer-service.interface';
import {fillDTO} from '../../helpers';
import {OffersRdo} from './rdo/offers.rdo';
import {ParamOfferId} from './type/param-offerid.type';
import {CreateOfferRequest} from './type/create-offer-request.type';
import {UpdateOfferDto} from './dto/update-offer.dto';
import {CommentRdo, CommentService} from '../comment';
import {CreateOfferDto} from './dto/create-offer.dto';

@injectable()
export class OffersController extends Controller {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Register routes for OffersController...');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectidMiddleware('offerId'),
        new DocumentExistMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectidMiddleware('offerId'),
        new DocumentExistMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectidMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.comments,
      middlewares: [
        new ValidateObjectidMiddleware('offerId'),
        new DocumentExistMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({ path: '/premium/:city', method: HttpMethod.Get, handler: this.premium });
    this.addRoute({
      path: '/collection/favorite',
      method: HttpMethod.Get,
      handler: this.favorite,
      middlewares: [
        new PrivateRouteMiddleware()
      ]
    });
    this.addRoute({
      path: '/collection/favorite/:offerId',
      method: HttpMethod.Patch,
      handler: this.changeFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectidMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });

  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    this.ok(res, fillDTO(OffersRdo, offers));
  }

  public async create({ body, tokenPayload }: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create({ ...body, user: tokenPayload.id });
    const offer = await this.offerService.findById(result.id);
    this.created(res, fillDTO(OffersRdo, offer));
  }

  public async show({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const result = await this.offerService.findById(offerId);
    this.created(res, fillDTO(OffersRdo, result));
  }

  public async update({ body, params }: Request<ParamOfferId, unknown, UpdateOfferDto>, res: Response): Promise<void> {
    const { offerId } = params;
    const result = await this.offerService.updateById(offerId, body);
    this.ok(res, fillDTO(OffersRdo, result));
  }

  public async delete({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const result = await this.offerService.deleteById(offerId);
    await this.commentService.deleteByOfferId(offerId);
    this.noContent(res, fillDTO(OffersRdo, result));
  }

  public async comments({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const result = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, result));
  }

  public async premium({ params }: Request, res: Response): Promise<void> {
    const { city } = params;
    const result = await this.offerService.findPremiumByCity(city as string);
    this.ok(res, fillDTO(OffersRdo, result));
  }

  public async favorite(_req: Request, res: Response): Promise<void> {
    const result = await this.offerService.findFavorite();
    this.ok(res, fillDTO(OffersRdo, result));
  }

  public async changeFavorite({ params }: Request, res: Response): Promise<void> {
    const { offerId, isFavorite } = params;
    const result = await this.offerService.updateFavoriteById(offerId, isFavorite === 'true');
    this.ok(res, fillDTO(OffersRdo, result));
  }
}
