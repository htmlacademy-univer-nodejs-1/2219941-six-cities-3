import {User} from './user.type';

export type Comments = {
  text: string;
  date: Date;
  rating: number;
  author: User;
}
