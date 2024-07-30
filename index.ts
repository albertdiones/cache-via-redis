import { RedisClientType } from '@redis/client';
import { createClient } from 'redis';


class CacheViaRedis {

    client: RedisClientType;

    constructor() {
    }

    connect() {
        this.client = createClient();
        this.client.connect();
    }

    async getItem(key: string): Promise<string | null> {
        return this.client.get(key).then((value) => value ? JSON.parse(value) : null);
    }

    setItem(
        key: string, 
        value: string,
        expiration: number
    ): void { 
        this.client.setEx(key, expiration, JSON.stringify(value));
    }
}

export default new CacheViaRedis();
