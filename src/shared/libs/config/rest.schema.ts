import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestSchema = {
  PORT: number;
  DB_HOST: string;
  SALT: string;
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
    default: null
  }
});
