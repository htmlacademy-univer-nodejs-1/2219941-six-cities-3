import {Convenience, HousingType} from '../../../types/index.js';
import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {UserEntity} from '../user/index.js';

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps{
  @prop({ required: true, trim: true, type: () => String })
  public name!: string;

  @prop({ required: true, trim: true, type: () => String })
  public description!: string;

  @prop({ required: true, type: () => String })
  public city!: string;

  @prop({ required: true, type: () => String })
  public imagePreview: string;

  @prop({ required: true, default: [], type: () => Array<string>})
  public offerImages: string[];

  @prop({ required: true, default: false, type: () => Boolean })
  public isPremium: boolean;

  @prop({ required: true, default: false, type: () => Boolean })
  public isFavorite: boolean;

  @prop({ required: true, default: 0, type: () => Number })
  public rating: number;

  @prop({
    type: () => String,
    enum: HousingType,
    required: true })
  public housingType!: HousingType;

  @prop({ required: true, default: 0, type: () => Number })
  public roomNumber!: number;

  @prop({ required: true, default: 0, type: () => Number })
  public guestNumber!: number;

  @prop({ required: true, type: () => Number })
  public price!: number;

  @prop({ required: true, type: () => Array<Convenience> })
  public conveniences!: Convenience[];

  @prop({ ref: UserEntity, required: true})
  public user!: Ref<UserEntity>;

  @prop({ default: 0, type: () => Number })
  public commentsNumber: number;

  @prop({ required: true, type: () => Array<string> })
  public coordinates!: [string, string];
}

export const OfferModel = getModelForClass(OfferEntity);
