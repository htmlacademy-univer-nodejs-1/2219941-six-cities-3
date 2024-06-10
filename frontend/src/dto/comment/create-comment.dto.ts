import UserDto from '../user/user.dto';

export default class CreateCommentDto {
  public text!: string;
  public user!: UserDto;
  public offerId!: string;
}
