import {Request} from 'express';
import {RequestParams} from '../../libs/application/types/request.params.type';
import {RequestBody} from '../../libs/application/types/request-body.type';
import {CreateUserDto} from './dto/create-user.dto';

export type CreateUserRequest = Request<RequestParams, RequestBody, CreateUserDto>;
