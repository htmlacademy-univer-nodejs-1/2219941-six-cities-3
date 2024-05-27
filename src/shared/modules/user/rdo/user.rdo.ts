import {Expose} from 'class-transformer';

export class UserRdo {
  @Expose()
  public email: string;

  @Expose()
  public avatar: string;

  @Expose()
  public userName: string;

  @Expose()
  public type: string;

  @Expose()
  public id: string;
}
