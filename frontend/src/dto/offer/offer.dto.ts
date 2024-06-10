import UserDto from '../user/user.dto';

export enum HousingType {
  Apartment = 'apartment',
  House = 'house',
  Room = 'room',
  Hotel = 'hotel'
}

export enum Convenience {
  Breakfast= 'Breakfast',
  AirConditioning = 'Air conditioning',
  LaptopFriendlyWorkspace = 'Laptop friendly workspace',
  BabySeat = 'Baby seat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge'
}
export class OfferDto {
  public id!: string;

  public name!: string;

  public description!: string;

  public date!: Date;

  public city!: string;

  public imagePreview!: string;

  public offerImages!: string[];

  public isPremium!: boolean;

  public isFavorite!: boolean;

  public rating!: number;

  public housingType!: HousingType;

  public roomNumber!: number;

  public guestNumber!: number;

  public price!: number;

  public conveniences!: Convenience[];

  public user!: UserDto;

  public commentsNumber!: number;

  public coordinates!: string[];
}
