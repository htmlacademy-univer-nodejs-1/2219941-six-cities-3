import {UserType} from './create-user.dto';

export default class UserDto {
  public userName!: string;

  public email!: string;

  public avatar!: string;

  public type!: UserType;
}
