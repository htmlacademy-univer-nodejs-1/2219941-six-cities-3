import {inject, injectable} from 'inversify';
import {Component} from '../../../types';
import {Logger} from '../../logger';
import {Config, RestSchema} from '../../config';
import {DEFAULT_STATIC_IMAGES, STATIC_RESOURCE_FIELDS} from './path-transformer.constant';
import {STATIC_FILES, STATIC_UPLOADS} from '../../../../application';
import {getFullSreverPath} from '../../../helpers';

function isObject(value: unknown): value is Record<string, object> {
  return typeof value === 'object' && value !== null;
}

@injectable()
export class PathTransformer {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>
  ) {
    this.logger.info('PathTranformer created!');
  }

  private hasDefaultImage(value: string) {
    return DEFAULT_STATIC_IMAGES.includes(value);
  }

  private isStaticProperty(property: string) {
    return STATIC_RESOURCE_FIELDS.includes(property);
  }

  public execute(data: Record<string, unknown>): Record<string, unknown> {
    const stack = [data];
    while (stack.length > 0) {
      const current = stack.pop();

      for (const key in current) {
        if (Object.hasOwn(current, key)) {
          const value = current[key];

          if (isObject(value)) {
            stack.push(value);
            continue;
          }

          if (this.isStaticProperty(key) && typeof value === 'string') {
            const staticPath = STATIC_FILES;
            const uplaodsPath = STATIC_UPLOADS;
            const serverHost = this.config.get('HOST');
            const serverPort = this.config.get('PORT');
            const rootPath = this.hasDefaultImage(value) ? staticPath : uplaodsPath;

            current[key] = `${getFullSreverPath(serverHost, serverPort)}${rootPath}/${value}`;
          }
        }
      }
    }
    return data;
  }
}
