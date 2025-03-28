import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();
export const redis = new Redis(process.env.UPSTASH_REDIS_URL);
//redis use key value pair to store data in redis

// How to use:
// redis.set("key", "value", "EX", 60); // 60 seconds expiration time
// redis.get("key").then((value) => console.log(value)); // value
//after 60 seconds, the value will return null
// redis.del("key"); // delete the key

//upstash using github credentials to connect to redis