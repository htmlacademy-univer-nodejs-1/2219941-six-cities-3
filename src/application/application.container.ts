import {Container} from 'inversify';
import {Application} from './application.js';
import {Component} from '../types/index.js';
import {Logger, PinoLogger} from '../shared/libs/logger/index.js';
import {Config, RestConfig, RestSchema} from '../shared/libs/config/index.js';
import {DatabaseClient, MongoDatabaseClient} from '../shared/libs/database-client/index.js';

export function createApplicationContainer() {
  const applicationContainer = new Container();
  applicationContainer.bind<Application>(Component.Application).to(Application).inSingletonScope();
  applicationContainer.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  applicationContainer.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  applicationContainer.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();

  return applicationContainer;
}
