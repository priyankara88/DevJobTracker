export default () => ({
  MONGO_URI: process.env.MONGO_URI,
  JWT: {
    SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: process.env.JWT_EXPIRE,
  },
});
