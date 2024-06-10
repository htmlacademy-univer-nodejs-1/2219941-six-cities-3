import {IsOptional, Matches, MaxLength, MinLength} from 'class-validator';
import {UserDTOValidationMessage} from './user-dto.messages';

export class UpdateUserDto {
  @IsOptional()
  @Matches(/\.(jpe?g|png)$/i, {message: UserDTOValidationMessage.avatar.invalidFormat})
  public avatar?: string;

  @IsOptional()
  @MinLength(1, { message: UserDTOValidationMessage.name.minLength})
  @MaxLength(15, { message: UserDTOValidationMessage.name.maxLength})
  public name?: string;
}
