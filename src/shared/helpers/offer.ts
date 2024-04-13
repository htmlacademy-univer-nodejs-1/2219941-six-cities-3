import {Convenience, HousingType, Offer, UserType} from '../../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    name,
    description,
    date,
    city,
    imagePreview,
    offerImages,
    isPremium,
    isFavorite,
    rating,
    housingType,
    roomNumber,
    guestNumber,
    price,
    conveniences,
    userName,
    email,
    avatar,
    password,
    type,
    commentsNumber,
    coordinates
  ] = offerData.replace('\n', '').split('\t');

  const user = {
    userName,
    email,
    avatar,
    password,
    type: type as UserType
  };

  return {
    name,
    description,
    date: new Date(date),
    city,
    imagePreview,
    offerImages: offerImages.split(',').map((image) => image.trim()),
    isPremium: Boolean(parseInt(isPremium, 10)),
    isFavorite: Boolean(parseInt(isFavorite, 10)),
    rating: Number.parseInt(rating, 10),
    housingType: housingType as HousingType,
    roomNumber: Number.parseInt(roomNumber, 10),
    guestNumber: Number.parseInt(guestNumber, 10),
    price: Number.parseInt(price, 10),
    conveniences: conveniences.split(',').map((convenience) => convenience.trim() as Convenience),
    user,
    commentsNumber: Number.parseInt(commentsNumber, 10),
    coordinates: {
      latitude: coordinates.split(',')[0].split(':')[1].trim(),
      longitude: coordinates.split(',')[1].split(':')[1].trim()
    }
  };
}
