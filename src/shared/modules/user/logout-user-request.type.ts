import {Request} from 'express';
import {RequestBody, RequestParams} from '../../libs/application';
import {LogoutUserDto} from './dto/logout-user.dto';

export type LogoutUserRequest = Request<RequestParams, RequestBody, LogoutUserDto>;
