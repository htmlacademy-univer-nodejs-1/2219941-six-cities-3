import {Convenience, HousingType} from './offer.dto';
import UserDto from '../user/user.dto';

export default class UpdateOfferDto {
  public name?: string;

  public description?: string;

  public date?: Date;

  public city?: string;

  public offerImages?: string[];

  public isPremium?: boolean;

  public isFavorite?: boolean;

  public rating?: number;

  public housingType?: HousingType;

  public roomNumber?: number;

  public guestNumber?: number;

  public price?: number;

  public conveniences?: Convenience[];

  public user?: UserDto;

  public commentsNumber?: number;

  public coordinates?: string[];
}
