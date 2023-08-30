import { Service } from 'typedi';
import * as redis from 'redis';
import { LoggerClient } from './LoggerClient';
import config from '../config/Config';

@Service()
export class RedisCacheClient {
  private client: redis.RedisClientType;

  constructor(public logger: LoggerClient) {}

  private connectClient = async () => {
    if (this.client && this.client.isReady) return;
    this.client = await redis.createClient({
      url: config.redisURL,
    });
    await this.client.connect();

    this.client.on('error', (err: Error) => {
      this.logger.error('Redis Error ' + err);
    });
  };

  get = async (key: string) => {
    await this.connectClient();
    return await this.client.get(key);
  };

  set = async (key: string, value: string) => {
    await this.connectClient();
    return await this.client.set(key, value, {
      EX: 60 * 60,
    });
  };

  delete = async (key: string) => {
    await this.connectClient();
    return await this.client.del(key);
  };
}
