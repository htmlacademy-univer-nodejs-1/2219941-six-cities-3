import {Command} from '../command.interface';
import chalk from 'chalk';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parametrs: string[]): Promise<void> {
    console.info(`${chalk.green(`
        Программа для подготовки данных для REST API сервера`)}
        Пример: cli.js --<command> [--arguments]
        Команды:
            ${chalk.magentaBright('--version')}:                   # выводит номер версии приложения
            ${chalk.magentaBright('--help')}:                      # выводит список и описание всех поддерживаемых аргументов
            ${chalk.magentaBright('--import <path>')}:             # импортирует данные из TSV-файла, путь к файлу передаётся в параметре path
            ${chalk.magentaBright('--generate <n> <path> <url>')}: # cоздаёт файл в формате tsv с тестовыми данными, где
                                           n - количество генерируемых предложений
                                           path - путь для сохранения файла с предложениями
                                           url - адрес сервера, с которого необходимо взять данные
    `);
  }
}
