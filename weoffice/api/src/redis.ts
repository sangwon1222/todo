import * as redis from "redis";
const redisClient = redis.createClient();

module.exports = redisClient;
