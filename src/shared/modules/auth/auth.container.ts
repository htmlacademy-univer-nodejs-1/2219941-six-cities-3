import {Container} from 'inversify';
import {AuthService} from './auth-service.interface';
import {ExceptionFilter} from '../../libs/application';
import {Component} from '../../types';
import {DefaultAuthService} from './default-auth.service';
import {AuthExceptionFilter} from './auth.exception-filter';

export function createAuthContainer() {
  const authContainer = new Container();
  authContainer.bind<AuthService>(Component.AuthService).to(DefaultAuthService).inSingletonScope();
  authContainer.bind<ExceptionFilter>(Component.AuthExceptionFilter).to(AuthExceptionFilter).inSingletonScope();

  return authContainer;
}
