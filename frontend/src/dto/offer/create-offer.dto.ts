import {Convenience, HousingType} from './offer.dto';

export class CreateOfferDto {
  public name!: string;

  public description!: string;

  public city!: string;

  public imagePreview!: string;

  public isPremium!: boolean;

  public housingType!: HousingType;

  public roomNumber!: number;

  public guestNumber!: number;

  public price!: number;

  public conveniences!: Convenience[];

  public coordinates!: string[];
}
