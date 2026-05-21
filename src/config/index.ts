import dotenv from "dotenv";
import path from "path";
import { env } from "process";


dotenv.config({
  quiet: true,
  path: path.join(process.cwd(), ".env.local"),
});


const config = {
  database_url: env.DATABASE_URL as string,
  port: env.PORT || 3000,
};

export default config;