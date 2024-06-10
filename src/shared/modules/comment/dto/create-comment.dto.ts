import {IsMongoId, MaxLength, MinLength} from 'class-validator';
import {CreateCommentValidationMessage} from './create-comment.messages';

export class CreateCommentDto {
  @MinLength(5, { message: CreateCommentValidationMessage.text.minLength})
  @MaxLength(1024, { message: CreateCommentValidationMessage.text.maxLength})
  public text: string;

  @IsMongoId({message: CreateCommentValidationMessage.userId.invalidFormat})
  public userId: string;

  @IsMongoId({message: CreateCommentValidationMessage.offerId.invalidFormat})
  public offerId: string;
}
