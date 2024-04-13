import 'reflect-metadata';
import {Application} from './application/index.js';
import {Container} from 'inversify';
import {Component} from './types/index.js';
import {createApplicationContainer} from './application/application.container.js';
import {createUserContainer} from './shared/modules/user/index.js';
import {createOfferContainer} from './shared/modules/offer/index.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createApplicationContainer(),
    createUserContainer(),
    createOfferContainer()
  );
  const application = appContainer.get<Application>(Component.Application);
  await application.init();
}

bootstrap();
