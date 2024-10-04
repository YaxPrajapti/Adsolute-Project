const Redis = require("redis");
const dotenv = require("dotenv").config({});

const client = Redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: "redis-19624.c11.us-east-1-2.ec2.redns.redis-cloud.com",
    port: 19624,
  },
});

client.on("error", (err) => console.log("Redis Client Error", err));
(async () => {
  try {
    await client.connect();
    console.log("Connected to Redis successfully.");
  } catch (error) {
    console.error("Error connecting to Redis:", error.message);
  }
})();

module.exports.cacheBooking = async (key, value) => {
  try {
    await client.set(key, JSON.stringify(value), {
      EX: 3600,
    });
    console.log("Booking stored in redis");
  } catch (error) {
    console.error("Booking is not saved in chache", error);
  }
};

module.exports.getBookings = async (key) => {
  try {
    const bookingData = await client.get(key);
    return bookingData ? JSON.parse(bookingData) : null;
  } catch (error) {
    console.error("Error in fetching bookings from redis", error);
  }
};
