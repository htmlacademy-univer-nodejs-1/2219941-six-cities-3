import {Convenience, Coordinates, HousingType} from '../../../../types/index.js';

export class CreateOfferDto {
  public name: string;
  public description: string;
  public date: Date;
  public city: string;
  public imagePreview: string;
  public offerImages: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public housingType: HousingType;
  public roomNumber: number;
  public guestNumber: number;
  public price: number;
  public conveniences: Convenience[];
  public user: string;
  public commentsNumber: number;
  public coordinates: Coordinates;
}
