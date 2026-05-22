import type { Request, Response } from "express";
import app from "./app";
import config from "./config/index";
import { initDB } from "./db";

const PORT = config.port;

const main = () => {
  // DB Connection
  initDB();

  // Server Activation MSG
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      message: "DevPluse Server is running successfully!",
      author: "Eftajul Islam Shadi",
    });
  });

  // Server Port Listening
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

main();
