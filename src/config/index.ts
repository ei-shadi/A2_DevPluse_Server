import dotenv from "dotenv";
import path from "path";
import { env } from "process";


dotenv.config({
  quiet: true,
  path: path.join(process.cwd(), ".env.local"),
});


const config = {
  environment: env.NODE_ENV || "development",
  database_url: env.DATABASE_URL as string,
  port: env.PORT || 3000,
  jwt_secret_key: env.JWT_SECRET_KEY as string,
};

export default config;