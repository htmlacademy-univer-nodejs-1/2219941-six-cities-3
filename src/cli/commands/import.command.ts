import {Command} from '../command.interface';
import {TsvFileReader} from '../../shared/file-reader';
import chalk from 'chalk';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public execute(...parameters: string[]) {
    const [fileName] = parameters;
    const fileReader = new TsvFileReader(fileName.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {
      if (! (err instanceof Error)) {
        throw err;
      }
      console.error(chalk.bold.red(`Can not import data from file: ${fileName}`));
      console.error(chalk.blueBright(err.message));
    }
  }
}
