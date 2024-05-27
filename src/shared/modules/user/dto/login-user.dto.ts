import {IsEmail, MaxLength, MinLength} from 'class-validator';
import {UserDTOValidationMessage} from './user-dto.messages';

export class LoginUserDto {
  @IsEmail({}, {message: UserDTOValidationMessage.email.invalidFormat})
  public email: string;

  @MinLength(6, { message: UserDTOValidationMessage.password.minLength})
  @MaxLength(12, { message: UserDTOValidationMessage.password.maxLength})
  public password: string;
}
