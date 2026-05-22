import app from "./app";
import config from "./config/index";
import { initDB } from "./db";

const PORT = config.port;

const main = () => {
  // DB Connection
  initDB();

  // Server Port Listening
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

main();
