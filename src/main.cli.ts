#!/usr/bin/env node
import {CliApplication, GenerateCommand, HelpCommand, ImportCommand, VersionCommand} from './cli';

function bootstrap() {
  const cliApplication = new CliApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand()
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
