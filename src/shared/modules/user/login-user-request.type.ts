import {Request} from 'express';
import {RequestBody, RequestParams} from '../../libs/application';
import {LoginUserDto} from './dto/login-user.dto';

export type LoginUserRequest = Request<RequestParams, RequestBody, LoginUserDto>;
