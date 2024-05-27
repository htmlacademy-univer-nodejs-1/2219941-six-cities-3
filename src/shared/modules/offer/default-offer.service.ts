import {OfferService} from './offer-service.interface';
import {inject, injectable} from 'inversify';
import {Component, SortType} from '../../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';
import {UpdateOfferDto} from './dto/update-offer.dto';
import {DEFAULT_OFFER_COUNT, PREMIUN_OFFER_COUNT} from './offer.constant.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer is created: ${dto.name}`);
    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['user'])
      .exec();
  }

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({createdAt: SortType.Down})
      .limit(DEFAULT_OFFER_COUNT)
      .populate(['user'])
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto):
    Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['user'])
      .exec();
  }

  public async deleteById(offerId: string):
    Promise<DocumentType<OfferEntity>| null>{
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async findPremiumByCity(city: string):
    Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({city: city, isPremium: true}, {}, {DEFAULT_OFFER_COUNT})
      .sort({createdAt: SortType.Down})
      .limit(PREMIUN_OFFER_COUNT)
      .populate(['user'])
      .exec();
  }

  public async findFavorite(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({isFavorite: true})
      .populate(['user'])
      .exec();
  }

  public async updateFavoriteById(offerId: string, status: boolean): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {isFavorite: !status}, {new: true})
      .populate(['user'])
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {commentsNumber: 1}})
      .exec();
  }

  public async updateRating(offerId: string, oldRating: number, newRating: number): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {rating: ((oldRating + newRating) / 2)})
      .exec();
  }

  public async exists(offerId: string): Promise<boolean>{
    return (await this.offerModel
      .exists({_id: offerId})) !== null;
  }
}
