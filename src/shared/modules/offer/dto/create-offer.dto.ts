import {Convenience, HousingType} from '../../../../types/index.js';
import {
  IsArray,
  IsBoolean,
  IsEnum, IsIn, IsInt, IsMongoId,
  IsOptional, IsString,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';
import {OfferDTOValidationMessage} from './offer-dto.messages';

export class CreateOfferDto {
  @MinLength(10, { message: OfferDTOValidationMessage.name.minLength})
  @MaxLength(100, { message: OfferDTOValidationMessage.name.maxLength})
  public name: string;

  @MinLength(20, { message: OfferDTOValidationMessage.name.minLength})
  @MaxLength(1024, { message: OfferDTOValidationMessage.name.maxLength})
  public description: string;

  @IsIn(['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'], { message: OfferDTOValidationMessage.city.invalidCity})
  public city: string;

  @IsString()
  public imagePreview: string;

  @IsBoolean({ message: OfferDTOValidationMessage.isPremium.invalidFormat})
  public isPremium: boolean;

  @IsEnum(HousingType, {message: OfferDTOValidationMessage.housingType.invalidFormat})
  public housingType: HousingType;

  @Min(1, { message: OfferDTOValidationMessage.roomNumber.min})
  @Max(8, { message: OfferDTOValidationMessage.roomNumber.max})
  @IsInt({message: OfferDTOValidationMessage.roomNumber.invalidFormat})
  public roomNumber: number;

  @Min(1, { message: OfferDTOValidationMessage.guestNumber.min})
  @Max(10, { message: OfferDTOValidationMessage.guestNumber.max})
  @IsInt({message: OfferDTOValidationMessage.guestNumber.invalidFormat})
  public guestNumber: number;

  @Min(100, { message: OfferDTOValidationMessage.price.min})
  @Max(100000, { message: OfferDTOValidationMessage.price.max})
  @IsInt({message: OfferDTOValidationMessage.price.invalidFormat})
  public price: number;

  @IsArray({ message: OfferDTOValidationMessage.conveniences.invalidFormat})
  @IsEnum(Convenience, {each: true, message: OfferDTOValidationMessage.conveniences.invalidType})
  public conveniences: Convenience[];

  @IsOptional()
  @IsMongoId()
  public user: string;

  @IsArray({ message: OfferDTOValidationMessage.coordinates.invalidFormat})
  @IsString({each: true, message: OfferDTOValidationMessage.coordinates.invalidType})
  public coordinates: string[];
}
