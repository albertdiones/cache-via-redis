Cache Via Mongo

Caching Adapter using MongoDb (Mongoose)

Sample Usage:

```
import cache from 'cache-via-redis';

cache.connect();


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
```

Why do you need this instead of for example Redis?
If you need a persisting cache, that can last across
multiple instances or usable across different application
or just a persistent cache that can outlast a reboot
