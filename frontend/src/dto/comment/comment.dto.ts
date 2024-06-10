import UserDto from '../user/user.dto';

export default class CommentDto {
  public id!: string;
  public offerId!: string;
  public text!: string;
  public rating!: number;
  public date!: string;
  public user!: UserDto;
}
