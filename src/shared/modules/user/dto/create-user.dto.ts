import {UserType} from '../../../../types/index.js';

export class CreateUserDto {
  public userName: string;
  public email: string;
  public avatar: string;
  public password: string;
  public type: UserType;
}
