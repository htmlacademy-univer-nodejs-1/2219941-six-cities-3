import {Command} from '../command.interface';
import {TsvFileReader} from '../../shared/file-reader';
import chalk from 'chalk';
import {createOffer, getErrorMessage} from '../../shared/helpers';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  private onImportedLine(line: string) {
    const offer = createOffer(line);
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported`);
  }

  public async execute(...parameters: string[]) {
    const [fileName] = parameters;
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
