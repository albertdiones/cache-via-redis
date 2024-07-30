import { createClient } from 'redis';
import cache from '.';

const redisClient = createClient();
await redisClient.connect();

function fetchWithCache(url): Promise<string> {
    return cache.getItem(url).then(
        (cacheItem: string | null) => {
            if (cacheItem) {
                console.log("Return from cache");
                return cacheItem;
            }
            return fetch(url).then(
                (response) => response.text()
            ).then(
                (responseText) => {
                    console.log("Setting cache from fetch");
                    cache.setItem(url, responseText, 60);
                    return responseText;
                }
            )
        }
    );
}

fetchWithCache('https://api.exchangerate-api.com/v4/latest/USD');