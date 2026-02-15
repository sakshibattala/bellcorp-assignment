import dotenv from "dotenv";
dotenv.config({ quiet: true });

export const ENV = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};
