import {HousingType} from './housing-type.enum';
import {Convenience} from './convenience.enum';
import {User} from './user.type';

export type Offer = {
  name: string;
  description: string;
  date: Date;
  city: string;
  imagePreview: string;
  offerImages: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HousingType;
  roomNumber: number;
  guestNumber: number;
  price: number;
  conveniences: Convenience[];
  user: User;
  commentsNumber: number;
  coordinates: string[]
}
