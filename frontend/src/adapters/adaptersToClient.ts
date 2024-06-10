import {CityName, Comment, Offer, Type, User} from '../types/types';
import {UserType} from '../dto/user/create-user.dto';
import UserDto from '../dto/user/user.dto';
import {OfferDto} from '../dto/offer/offer.dto';
import {CityLocation} from '../const';
import CommentDto from '../dto/comment/comment.dto';

export const adaptUserToClient = (user: UserDto): User => ({
  name: user.userName,
  email: user.email,
  avatarUrl: user.avatar,
  isPro: user.type === UserType.Pro
});

export const adaptOffersListToClient = (offers: OfferDto[]): Offer[] => (
  offers.map((offer: OfferDto): Offer => ({
    id: offer.id,
    price: offer.price,
    rating: offer.rating,
    title: offer.name,
    isPremium: offer.isPremium,
    isFavorite: offer.isPremium,
    city: {
      name: offer.city as CityName,
      location: {
        latitude: CityLocation[offer.city as CityName].latitude,
        longitude: CityLocation[offer.city as CityName].longitude
      }
    },
    location: {
      latitude: CityLocation[offer.city as CityName].latitude,
      longitude: CityLocation[offer.city as CityName].longitude
    },
    previewImage: offer.imagePreview,
    type: offer.housingType as Type,
    bedrooms: offer.roomNumber,
    description: offer.description,
    goods: offer.conveniences,
    host: adaptUserToClient(offer.user),
    images: offer.offerImages,
    maxAdults: offer.roomNumber
  }))
);

export const adaptOfferToClient = (offer: OfferDto): Offer => ({
  id: offer.id,
  price: offer.price,
  rating: offer.rating,
  title: offer.name,
  isPremium: offer.isPremium,
  isFavorite: offer.isPremium,
  city: {
    name: offer.city as CityName,
    location: {
      latitude: CityLocation[offer.city as CityName].latitude,
      longitude: CityLocation[offer.city as CityName].longitude
    }},
  location: {
    latitude: CityLocation[offer.city as CityName].latitude,
    longitude: CityLocation[offer.city as CityName].longitude
  },
  previewImage: offer.imagePreview,
  type: offer.housingType as Type,
  bedrooms: offer.roomNumber,
  description: offer.description,
  goods: offer.conveniences as string[],
  host: adaptUserToClient(offer.user),
  images: offer.offerImages,
  maxAdults: offer.roomNumber
});

export const adaptCommentsToClient = (comments: CommentDto[]): Comment[] => (
  comments
    .filter((comment: CommentDto) => comment.user !== null)
    .map((comment: CommentDto): Comment => ({
      id: comment.id,
      comment: comment.text,
      date: comment.date,
      rating: comment.rating,
      user: adaptUserToClient(comment.user),
    }))
);
