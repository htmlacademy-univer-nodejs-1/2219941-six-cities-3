import {Command} from './command.interface';
import {CommandParser} from './command-parser.js';

type CommandsCollection = Record<string, Command>;

export class CliApplication {
  private commands: CommandsCollection = {};

  constructor(
    private readonly defaultCommand: string = '--help'
  ) {}

  public registerCommands(newCommands: Command[]): void {
    newCommands.forEach((command) => {
      const commandName = command.getName();
      if (Object.hasOwn(this.commands, commandName)) {
        throw new Error(`Command ${commandName} is already registered`);
      }
      this.commands[commandName] = command;
    });
  }

  public getDefaultCommand(): Command | never {
    if (!this.commands[this.defaultCommand]) {
      throw new Error(`The default command (${this.defaultCommand} is not registered.`);
    }
    return this.commands[this.defaultCommand];
  }

  public getCommand(commandName: string): Command {
    return this.commands[commandName] ?? this.getDefaultCommand();
  }

  public processCommand(inputCommand: string[]): void {
    const parsedCommand = CommandParser.parse(inputCommand);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }
}
