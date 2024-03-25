#!/usr/bin/env node
import {CliApplication, HelpCommand, ImportCommand, VersionCommand} from './cli';

function bootstrap() {
  const cliApplication = new CliApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand()
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
