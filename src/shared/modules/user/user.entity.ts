import {User, UserType} from '../../../types/index.js';
import {defaultClasses, getModelForClass, modelOptions, prop} from '@typegoose/typegoose';
import {createSHA256} from '../../helpers/index.js';

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true, default: '', type: () => String })
  public userName: string;

  @prop({ unique: true, required: true, type: () => String })
  public email: string;

  @prop({ required: false, default: '', type: () => String })
  public avatar: string;

  @prop({ required: true, default: '', type: () => String })
  private password?: string;

  @prop({ required: true, type: () => String, enum: UserType })
  public type: UserType;

  constructor(userData: User) {
    super();
    this.userName = userData.userName;
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
