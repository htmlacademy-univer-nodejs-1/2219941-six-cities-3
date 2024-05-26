import {Container} from 'inversify';
import {OfferService} from './offer-service.interface.js';
import {Component} from '../../../types/index.js';
import {DefaultOfferService} from './default-offer.service.js';
import {types} from '@typegoose/typegoose';
import {OfferEntity, OfferModel} from './offer.entity.js';
import {Controller} from '../../libs/application/index.js';
import {OffersController} from './offers.controller.js';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<OfferService>(Component.OfferService).to(DefaultOfferService);
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  offerContainer.bind<Controller>(Component.OffersController).to(OffersController).inSingletonScope();

  return offerContainer;
}
