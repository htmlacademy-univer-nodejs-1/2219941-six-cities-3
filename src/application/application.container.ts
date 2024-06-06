import {Container} from 'inversify';
import {Application} from './application.js';
import {Component} from '../types/index.js';
import {Logger, PinoLogger} from '../shared/libs/logger/index.js';
import {Config, RestConfig, RestSchema} from '../shared/libs/config/index.js';
import {DatabaseClient, MongoDatabaseClient} from '../shared/libs/database-client/index.js';
import {AppExceptionFilter, ExceptionFilter, ValidationExceptionFilter} from '../shared/libs/application/index.js';
import {HttpErrorExceptionFilter} from '../shared/libs/application/exception-filter/http-error.exception-filter';
import {PathTransformer} from '../shared/libs/application/transform/path-transformer.js';

export function createApplicationContainer() {
  const applicationContainer = new Container();
  applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
  applicationContainer.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  applicationContainer.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  applicationContainer.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();
  applicationContainer.bind<ExceptionFilter>(Component.ExceptionFilter).to(AppExceptionFilter).inSingletonScope();
  applicationContainer.bind<ExceptionFilter>(Component.HttpExceptionFilter).to(HttpErrorExceptionFilter).inSingletonScope();
  applicationContainer.bind<ExceptionFilter>(Component.ValidationExceptionFilter).to(ValidationExceptionFilter).inSingletonScope();
  applicationContainer.bind<PathTransformer>(Component.PathTransformer).to(PathTransformer).inSingletonScope();

  return applicationContainer;
}
