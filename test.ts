import mongoose from 'mongoose';
import cache from '.';
import { CacheItem } from './schema';

const mongoUrl = 'mongodb://localhost:27017/cache_via_mongo_test';

await mongoose.connect(mongoUrl);


function fetchWithCache(url): Promise<string> {
    return cache.getItem(url).then(
        (cacheItem: CacheItem | null) => {
            if (cacheItem) {
                console.log("Return from cache");
                return cacheItem.value;
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