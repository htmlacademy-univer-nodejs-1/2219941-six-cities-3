import {Expose} from 'class-transformer';

export class LoggedUserRdo {
  @Expose()
  public token: string;

  @Expose()
  public email: string;

  @Expose()
  public userName: string;

  @Expose()
  public avatar: string;

  @Expose()
  public id: string;
}

