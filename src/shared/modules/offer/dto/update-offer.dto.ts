import {Convenience, HousingType} from '../../../../types/index.js';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum, IsIn, IsInt, IsMongoId,
  IsNumber, IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';
import {OfferDTOValidationMessage} from './offer-dto.messages';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: OfferDTOValidationMessage.name.minLength})
  @MaxLength(100, { message: OfferDTOValidationMessage.name.maxLength})
  public name?: string;

  @IsOptional()
  @MinLength(20, { message: OfferDTOValidationMessage.name.minLength})
  @MaxLength(1024, { message: OfferDTOValidationMessage.name.maxLength})
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: OfferDTOValidationMessage.date.invalidFormat })
  public date?: Date;

  @IsOptional()
  @IsIn(['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'], { message: OfferDTOValidationMessage.city.invalidCity})
  public city?: string;

  @IsOptional()
  @MaxLength(50, { message: OfferDTOValidationMessage.imagePreview.maxLength})
  public imagePreview?: string;

  @IsOptional()
  @IsArray({message: OfferDTOValidationMessage.offerImages.invalidFormat})
  @IsString({each: true, message: OfferDTOValidationMessage.offerImages.invalidType})
  public offerImages?: string[];

  @IsOptional()
  @IsBoolean({ message: OfferDTOValidationMessage.isPremium.invalidFormat})
  public isPremium?: boolean;

  @IsOptional()
  @IsBoolean({ message: OfferDTOValidationMessage.isFavorite.invalidFormat})
  public isFavorite?: boolean;

  @IsOptional()
  @Min(1, { message: OfferDTOValidationMessage.rating.min})
  @Max(5, { message: OfferDTOValidationMessage.rating.max})
  @IsNumber({maxDecimalPlaces: 1}, {message: OfferDTOValidationMessage.rating.invalidFormat})
  public rating?: number;

  @IsOptional()
  @IsEnum(HousingType, {message: OfferDTOValidationMessage.housingType.invalidFormat})
  public housingType?: HousingType;

  @IsOptional()
  @Min(1, { message: OfferDTOValidationMessage.roomNumber.min})
  @Max(8, { message: OfferDTOValidationMessage.roomNumber.max})
  @IsInt({message: OfferDTOValidationMessage.roomNumber.invalidFormat})
  public roomNumber?: number;

  @IsOptional()
  @Min(1, { message: OfferDTOValidationMessage.guestNumber.min})
  @Max(10, { message: OfferDTOValidationMessage.guestNumber.max})
  @IsInt({message: OfferDTOValidationMessage.guestNumber.invalidFormat})
  public guestNumber?: number;

  @IsOptional()
  @Min(100, { message: OfferDTOValidationMessage.price.min})
  @Max(100000, { message: OfferDTOValidationMessage.price.max})
  @IsInt({message: OfferDTOValidationMessage.price.invalidFormat})
  public price?: number;

  @IsOptional()
  @IsArray({ message: OfferDTOValidationMessage.conveniences.invalidFormat})
  @IsEnum(Convenience, {each: true, message: OfferDTOValidationMessage.conveniences.invalidType})
  public conveniences?: Convenience[];

  @IsOptional()
  @IsMongoId({message: OfferDTOValidationMessage.user.invalidFormat})
  public user?: string;

  @IsOptional()
  @IsInt({message: OfferDTOValidationMessage.commentsNumber.invalidFormat})
  public commentsNumber?: number;

  @IsOptional()
  @IsArray({ message: OfferDTOValidationMessage.coordinates.invalidFormat})
  @IsString({each: true, message: OfferDTOValidationMessage.coordinates.invalidType})
  public coordinates?: string[];
}
