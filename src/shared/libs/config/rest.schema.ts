import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestSchema = {
  PORT: number;
  DB_HOST: string;
  SALT: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: string;
  DB_NAME: string;
}

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    env: 'PORT',
    format: 'port',
    default: 4000
  },
  DB_HOST: {
    doc: 'IP-address for database',
    env: 'DB_HOST',
    format: 'ipaddress',
    default: '127.0.0.1'
  },
  SALT: {
    doc: 'String with random symbols',
    env: 'SALT',
    format: String,
    default: ''
  },
  DB_USER: {
    doc: 'Database user name',
    env: 'DB_USER',
    format: String,
    default: ''
  },
  DB_PASSWORD: {
    doc: 'Database user password',
    env: 'DB_PASSWORD',
    format: String,
    default: ''
  },
  DB_PORT: {
    doc: 'Port for database',
    env: 'DB_PORT',
    format: 'port',
    default: '27017'
  },
  DB_NAME: {
    doc: 'Name of the database',
    env: 'DB_NAME',
    format: String,
    default: 'six-cities'
  }
});
