import {Expose, Type} from 'class-transformer';
import {UserRdo} from '../../user/rdo/user.rdo';
import {Convenience} from '../../../../types';

export class OffersRdo {
  @Expose()
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public description: string;

  @Expose()
  public date: string;

  @Expose()
  public city: string;

  @Expose()
  public price: number;

  @Expose()
  public imagePreview: string;

  @Expose()
  public offerImages: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public housingType: string;

  @Expose()
  public roomNumber: number;

  @Expose()
  public guestNumber: number;

  @Expose()
  public commentsNumber: number;

  @Expose()
  public coordinates: string[];

  @Expose()
  public conveniences: Convenience[];

  @Expose()
  @Type(() => UserRdo)
  public user: UserRdo;
}
