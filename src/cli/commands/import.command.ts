import {Command} from '../command.interface';
import {TsvFileReader} from '../../shared/libs/file-reader/index.js';
import chalk from 'chalk';
import {createOffer, getErrorMessage, getMongoDBURL} from '../../shared/helpers/index.js';
import {UserService} from '../../shared/modules/user/user-service.interface.js';
import {DefaultOfferService, OfferModel, OfferService} from '../../shared/modules/offer/index.js';
import {DatabaseClient, MongoDatabaseClient} from '../../shared/libs/database-client/index.js';
import {Logger} from '../../shared/libs/logger/index.js';
import {ConsoleLogger} from '../../shared/libs/logger/console.logger.js';
import {DefaultUserService, UserModel} from '../../shared/modules/user/index.js';
import {Offer} from '../../types/index.js';
import {DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD} from './command.constant.js';

export class ImportCommand implements Command {
  private userService: UserService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return '--import';
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.user,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({
      name: offer.name,
      description: offer.description,
      date: offer.date,
      city: offer.city,
      imagePreview: offer.imagePreview,
      offerImages: offer.offerImages,
      isPremium: offer.isPremium,
      isFavorite: offer.isFavorite,
      rating: offer.rating,
      housingType: offer.housingType,
      roomNumber: offer.roomNumber,
      guestNumber: offer.guestNumber,
      price: offer.price,
      conveniences: offer.conveniences,
      user: user.id,
      commentsNumber: offer.commentsNumber,
      coordinates: offer.coordinates
    });
  }

  public async execute(fileName: string, login: string, password: string,
    host: string, dbname: string, salt: string): Promise<void> {
    const url = getMongoDBURL(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(url);

    const fileReader = new TsvFileReader(fileName.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (err) {
      if (! (err instanceof Error)) {
        throw err;
      }
      console.error(chalk.bold.red(`Can not import data from file: ${fileName}`));
      console.error(chalk.blueBright(getErrorMessage(err)));
    }
  }
}
