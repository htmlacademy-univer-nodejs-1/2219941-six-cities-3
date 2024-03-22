import {FileReader} from './file-reader.interface';
import {readFileSync} from 'node:fs';
import {Offer} from '../../types/offer.type';
import {HousingType} from '../../types/housing-type.enum';
import {Convenience} from '../../types/convenience.enum';
import {UserType} from '../../types/user-type.enum';

export class TsvFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly fileName: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.fileName, { encoding: 'utf-8'});
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error(`File ${this.fileName} was not read`);
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([name, description, date, city, imagePreview, offerImages, isPremium,
        isFavorite, rating, housingType, roomNumber, guestNumber, price,
        conveniences, userName, email, avatar, password, type, commentsNumber, coordinates]) => ({
        name,
        description,
        date: new Date(date),
        city,
        imagePreview,
        offerImages: offerImages.split(',').map((image) => image.trim()),
        isPremium: Boolean(isPremium),
        isFavorite: Boolean(isFavorite),
        rating: Number.parseInt(rating, 10),
        housingType: housingType as HousingType,
        roomNumber: Number.parseInt(roomNumber, 10),
        guestNumber: Number.parseInt(guestNumber, 10),
        price: Number.parseInt(price, 10),
        conveniences: conveniences.split(',').map((convenience) => convenience.trim() as Convenience),
        user: {name: userName, email, avatar, password, type: type as UserType},
        commentsNumber: Number.parseInt(commentsNumber, 10),
        coordinates: {
          latitude: coordinates.split(',')[0].split(':')[1].trim(),
          longitude: coordinates.split(',')[1].split(':')[1].trim()
        }
      }));
  }
}
