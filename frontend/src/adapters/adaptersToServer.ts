import {CityName, Comment, NewOffer, User, UserRegister} from '../types/types';
import UserDto from '../dto/user/user.dto';
import CreateUserDto, {UserType} from '../dto/user/create-user.dto';
import {Convenience, HousingType} from '../dto/offer/offer.dto';
import {CreateOfferDto} from '../dto/offer/create-offer.dto';
import CreateCommentDto from '../dto/comment/create-comment.dto';

export const adaptUserToServer = (user: User): UserDto => ({
  userName: user.name,
  email: user.email,
  type: user.isPro ? UserType.Pro : UserType.Standart,
  avatar: user.avatarUrl
});

export const adaptCreateUserToServer = (user: UserRegister): CreateUserDto => ({
  userName: user.name,
  email: user.email,
  type: user.isPro ? UserType.Pro : UserType.Standart,
  password: user.password,
  avatar: user.avatar?.name
});

export const adaptCreateOfferToServer = (offer: NewOffer): CreateOfferDto => ({
  name: offer.title,
  description: offer.description,
  city: offer.city.name as CityName,
  imagePreview: offer.previewImage,
  isPremium: offer.isPremium,
  housingType: offer.type as HousingType,
  roomNumber: offer.bedrooms,
  guestNumber: offer.maxAdults,
  price: offer.price,
  conveniences: offer.goods.map((good: string) => good as Convenience),
  coordinates: [
    offer.location.latitude.toString(),
    offer.location.longitude.toString()
  ]
});

export const adaptCommentToServer = (comment: Comment): CreateCommentDto => ({
  text: comment.comment,
  user: adaptUserToServer(comment.user),
  offerId: comment.id
});
