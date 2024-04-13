import {Convenience, Coordinates, HousingType} from '../../../types/index.js';
import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {UserEntity} from '../user/index.js';

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps{
  @prop({ required: true, trim: true })
  public name!: string;

  @prop({ required: true, trim: true })
  public description!: string;

  @prop({ required: true})
  public date!: Date;

  @prop({ required: true})
  public city!: string;

  @prop({ required: true})
  public imagePreview: string;

  @prop({ required: true, default: [] })
  public offerImages: string[];

  @prop({ required: true, default: false })
  public isPremium: boolean;

  @prop({ required: true, default: false })
  public isFavorite: boolean;

  @prop({ required: true, default: 0 })
  public rating: number;

  @prop({
    type: () => String,
    enum: HousingType,
    required: true })
  public housingType!: HousingType;

  @prop({ required: true, default: 0})
  public roomNumber!: number;

  @prop({ required: true, default: 0 })
  public guestNumber!: number;

  @prop({ required: true })
  public price!: number;

  @prop({ required: true, type: Array<Convenience> })
  public conveniences!: Convenience[];

  @prop({ ref: UserEntity, required: true })
  public user!: Ref<UserEntity>;

  @prop({ default: 0 })
  public commentsNumber: number;

  @prop({ required: true, type: () => String })
  public coordinates!: Coordinates;
}

export const OfferModel = getModelForClass(OfferEntity);
