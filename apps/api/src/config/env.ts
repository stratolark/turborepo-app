import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}.local`,
});
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
export const { REDIS_URL, SESSION_SECRET } = process.env;
