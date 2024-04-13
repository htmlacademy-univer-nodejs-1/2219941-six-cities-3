import {DatabaseClient} from './database-client.interface.js';
import {inject, injectable} from 'inversify';
import { setTimeout } from 'node:timers/promises';
import * as Mongoose from 'mongoose';
import {Component} from '../../../types/index.js';
import {Logger} from '../logger/index.js';

const ATTEMPT_COUNT = 5;
const RETRY_TIMEOUT = 1000;

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private mongoose: typeof Mongoose;
  private isConnected: boolean;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.isConnected = false;
  }

  public isConnectedToDB() {
    return this.isConnected;
  }

  public async connect(url: string): Promise<void> {
    if (this.isConnectedToDB()) {
      throw new Error('Already connected to MongoDB');
    }

    this.logger.info('Trying to connect to MongoDB');
    let attempt = 0;
    while (attempt < ATTEMPT_COUNT) {
      try {
        this.mongoose = await Mongoose.connect(url);
        this.isConnected = true;
        this.logger.info('MongoDB connection is established');
        return;
      } catch (error) {
        attempt++;
        this.logger.error('Failed to connect to MongoDB. Trying again...', error as Error);
        await setTimeout(RETRY_TIMEOUT);
      }
    }
    throw new Error(`Unable to connect to MongoDB after ${ATTEMPT_COUNT} attempts`);
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnectedToDB()) {
      throw new Error('Not connected to MongoDB');
    }
    await this.mongoose.disconnect?.();
    this.isConnected = false;
    this.logger.info('MongoDB connection is closed');
  }
}
