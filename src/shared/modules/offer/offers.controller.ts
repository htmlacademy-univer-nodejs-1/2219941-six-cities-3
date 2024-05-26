import {inject, injectable} from 'inversify';
import {Controller, HttpMethod} from '../../libs/application/index.js';
import {Component} from '../../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {Request, Response} from 'express';
import {OfferService} from './offer-service.interface';
import {fillDTO} from '../../helpers';
import {OffersRdo} from './rdo/offers.rdo';
import {CreateOfferDto} from './dto/create-offer.dto';

@injectable()
export class OffersController extends Controller {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);

    this.logger.info('Register routes for OffersController...');

    this.addRoute({ path: '/offers', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/offers/:offerId', method: HttpMethod.Get, handler: this.getOne });
    this.addRoute({ path: '/offers/create', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/offers/:offerId/edit', method: HttpMethod.Put, handler: this.update });
    this.addRoute({ path: '/offers/:offerId/delete', method: HttpMethod.Delete, handler: this.delete });
    this.addRoute({ path: '/offers/getPremium', method: HttpMethod.Get, handler: this.premium });
    this.addRoute({ path: '/offers/getFavorite', method: HttpMethod.Get, handler: this.favorite });
    this.addRoute({ path: '/offers/changeFavorite/:offerId', method: HttpMethod.Get, handler: this.changeFavorite });

  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OffersRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>, res: Response
  ): Promise<void> {
    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OffersRdo, result));
  }

  public async getOne({ params }: Request, res: Response): Promise<void> {
    const { offerId } = params;
    const result = await this.offerService.findById(offerId);
    this.created(res, fillDTO(OffersRdo, result));
  }

  public async update({ body, params }: Request, res: Response): Promise<void> {
    const { offerId } = params;
    const result = await this.offerService.updateById(offerId, body);
    this.created(res, fillDTO(OffersRdo, result));
  }

  public async delete({ params }: Request, res: Response): Promise<void> {
    const { offerId } = params;
    const result = await this.offerService.deleteById(offerId);
    this.created(res, fillDTO(OffersRdo, result));
  }

  public async premium({ params }: Request, res: Response): Promise<void> {
    const { city } = params;
    const result = await this.offerService.findPremiumByCity(city);
    this.created(res, fillDTO(OffersRdo, result));
  }

  public async favorite(_req: Request, res: Response): Promise<void> {
    const result = await this.offerService.findFavorite();
    this.created(res, fillDTO(OffersRdo, result));
  }

  public async changeFavorite({ params }: Request, res: Response): Promise<void> {
    const { offerId, isFavorite } = params;
    const result = await this.offerService.updateFavoriteById(offerId, isFavorite === 'true');
    this.created(res, fillDTO(OffersRdo, result));
  }
}
