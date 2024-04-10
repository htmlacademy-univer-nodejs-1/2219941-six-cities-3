import {OfferGenerator} from './offer-generator.interface';
import {Convenience, HousingType, MockServerData, UserType} from '../../../types';
import {generateRandomValue, getRandomItem, getRandomItems} from '../../helpers';
import dayjs from 'dayjs';

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_ROOMS = 1;
const MAX_ROOMS = 5;

const MIN_GUESTS = 1;
const MAX_GUESTS = 5;

const MIN_PRICE = 1;
const MAX_PRICE = 5;

const MIN_COMMENTS = 1;
const MAX_COMMENTS = 5;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const STATUS_VARIANTS = ['0', '1'];

export class TsvOfferGenerator implements OfferGenerator{
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const name = getRandomItem<string>(this.mockData.name);
    const description = getRandomItem<string>(this.mockData.description);
    const city = getRandomItem<string>(this.mockData.city);
    const imagePreview = getRandomItem<string>(this.mockData.imagePreview);
    const user = getRandomItem<string>(this.mockData.user);
    const email = getRandomItem<string>(this.mockData.email);
    const avatar = getRandomItem<string>(this.mockData.avatar);
    const password = getRandomItem<string>(this.mockData.password);
    const coordinates = getRandomItem<string>(this.mockData.coordinates);

    const offerImages = getRandomItems<string>(this.mockData.imagePreview);
    const isPremium = getRandomItem<string>(STATUS_VARIANTS);
    const isFavorite = getRandomItem<string>(STATUS_VARIANTS);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const housing = getRandomItem<string>([HousingType.House, HousingType.Room, HousingType.Hotel, HousingType.Apartment]);
    const rooms = generateRandomValue(MIN_ROOMS, MAX_ROOMS).toString();
    const guests = generateRandomValue(MIN_GUESTS, MAX_GUESTS).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const conveniences = getRandomItems<string>([Convenience.BabySeat, Convenience.Fridge, Convenience.Towels,
      Convenience.Washer, Convenience.Breakfast, Convenience.AirConditioning, Convenience.LaptopFriendlyWorkspace]);
    const type = getRandomItem<string>([UserType.Pro, UserType.Standart]);
    const comments = generateRandomValue(MIN_COMMENTS, MAX_COMMENTS).toString();

    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
      name, description, createdDate, city, imagePreview, offerImages, isPremium,
      isFavorite, rating, housing, rooms, guests, price,
      conveniences, user, email, avatar, password, type, comments, coordinates
    ].join('\t');
  }
}
