import {inject, injectable} from 'inversify';
import {
  Controller,
  HttpError,
  HttpMethod,
  UploadFileMiddleware,
  ValidateDtoMiddleware, ValidateObjectidMiddleware
} from '../../libs/application/index.js';
import {Component} from '../../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {Request, Response} from 'express';
import {CreateUserRequest} from './create-user.request.js';
import {UserService} from './user-service.interface';
import {Config, RestSchema} from '../../libs/config/index.js';
import {StatusCodes} from 'http-status-codes';
import {fillDTO} from '../../helpers';
import {UserRdo} from './rdo/user.rdo';
import {LoginUserRequest} from './login-user-request.type';
import {CreateUserDto} from './dto/create-user.dto';
import {LoginUserDto} from './dto/login-user.dto';
import {AuthService} from '../auth';
import {LoggedUserRdo} from './rdo/logged-user.rdo';
import {UploadUserAvatarRdo} from './rdo/upload-user-avatar.rdo';

@injectable()
export class UserController extends Controller {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
    @inject(Component.AuthService) private readonly authService: AuthService
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute({
      path: '/register',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)]
    });
    this.addRoute({
      path: '/login',
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)]
    });
    this.addRoute({ path: '/login', method: HttpMethod.Get, handler: this.check});
    this.addRoute({ path: '/logout', method: HttpMethod.Delete, handler: this.logout});
    this.addRoute({
      path: '/:userId/avatar',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new ValidateObjectidMiddleware('userId'),
        new UploadFileMiddleware(this.configService.get('UPLOADS_DIRECTORY'), 'avatar')
      ]
    });
  }

  public async create({ body }: CreateUserRequest, res: Response): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login({ body }: LoginUserRequest, res: Response): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(LoggedUserRdo, user);
    this.ok(res, Object.assign(responseData, { token }));
  }

  public async check({ tokenPayload: {email}}: Request, res: Response): Promise<void> {
    const existsUser = await this.userService.findByEmail(email);

    if (! existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${email} not found.`,
        'UserController'
      );
    }

    this.ok(res, fillDTO(LoggedUserRdo, existsUser));
  }

  public async logout({ body }: LoginUserRequest, _res: Response
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (! existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController'
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController'
    );
  }

  public async uploadAvatar({ params, file }: Request, res: Response) {
    const { userId } = params;
    const uploadFile = { avatar: file?.filename };
    await this.userService.updateById(userId, uploadFile);
    this.created(res, fillDTO(UploadUserAvatarRdo, {filepath: uploadFile.avatar }));
  }
}
