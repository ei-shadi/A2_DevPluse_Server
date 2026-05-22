import { neon } from "@neondatabase/serverless";

import config from "../config/index";
import { createSchema } from "./schema";

export const sql = neon(config.database_url);

export const initDB = async () => {

  await createSchema();

  console.log("WOW --> Database connected successfully!");
};
