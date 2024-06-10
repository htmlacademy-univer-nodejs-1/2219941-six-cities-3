export enum UserType {
  Standart = 'обычный',
  Pro = 'pro'
}

export default class CreateUserDto {
  public userName!: string;

  public email!: string;

  public avatar?: string;

  public password!: string;

  public type!: UserType;
}
