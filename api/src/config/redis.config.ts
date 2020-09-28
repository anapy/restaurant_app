const redis = require("redis");

//this file contains the information to connect with the db
const redisConfig = {
  host: "redis",
  port: "6379",
  options: {}
};

const redisClient = redis.createClient(
  redisConfig.port,
  redisConfig.host,
  redisConfig.options
);

redisClient.on("connect", function() {
  console.log("Successfully connected to redis.");
});

export {redisClient};

