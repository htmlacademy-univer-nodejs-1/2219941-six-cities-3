import got from 'got';
import {Command} from '../command.interface';
import {MockServerData} from '../../types';
import {TsvOfferGenerator} from '../../shared/libs/offer-generator';
import {TsvFileWriter} from '../../shared/libs/file-writer';
import {getErrorMessage} from '../../shared/helpers';

export class GenerateCommand implements Command {
  private initialData!: MockServerData;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TsvOfferGenerator(this.initialData);
    const tsvFileWriter = new TsvFileWriter(filepath);
    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, path, url] = parameters;
    const offerCount = parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(path, offerCount);
      console.log('File was generated!');
    } catch (error: unknown) {
      console.error('Can\'t generate data');
      console.error(getErrorMessage(error));
    }
  }
}
