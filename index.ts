import { CacheItem } from "./schema"


export default {
    getItem: async (key: string): Promise<CacheItem | null> => {
        return CacheItem.findOne({key, expiration: { $gt: Date.now() }}).then((item) => item);
    },
    setItem: (key: string, value: string, expiration: number): void => { 
        CacheItem.deleteOne({key}).then(
            () => {
                new CacheItem({key, value, expiration: Date.now() + (expiration*1000)}).save();
            }
        );
    }
};