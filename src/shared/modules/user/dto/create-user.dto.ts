import {UserType} from '../../../../types/index.js';
import {IsEmail, IsEnum, MaxLength, MinLength} from 'class-validator';
import {UserDTOValidationMessage} from './user-dto.messages';

export class CreateUserDto {
  @MinLength(10, { message: UserDTOValidationMessage.name.minLength})
  @MaxLength(100, { message: UserDTOValidationMessage.name.maxLength})
  public userName: string;

  @IsEmail({}, {message: UserDTOValidationMessage.email.invalidFormat})
  public email: string;

  @MinLength(6, { message: UserDTOValidationMessage.password.minLength})
  @MaxLength(12, { message: UserDTOValidationMessage.password.maxLength})
  public password: string;

  @IsEnum(UserType, {message: UserDTOValidationMessage.type.invalidFormat})
  public type: UserType;
}
