import * as mongoose from 'mongoose';

const cacheItemSchema = new mongoose.Schema(
    {
        key: {type: String, required: true, unique: true, },
        value: { type: mongoose.Schema.Types.Mixed, required: true },
        expiration: {type: Number, required: true},
    }
);

cacheItemSchema.index( { key : 1 }, { unique: true });

export type CacheItem = mongoose.InferSchemaType<typeof cacheItemSchema> & mongoose.Document;
export const CacheItem = mongoose.model('CacheItem', cacheItemSchema);

  
