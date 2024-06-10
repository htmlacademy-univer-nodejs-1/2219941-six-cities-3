import {UserType} from './create-user.dto';

export default class UserWithTokenDto {
  public userName!: string;

  public email!: string;

  public avatar!: string;

  public type!: UserType;

  public token!: string;
}
