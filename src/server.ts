// import { initDB } from "./db"
import type { Request, Response } from "express";
import app from "./app";
import config from "./config/index";

const PORT = config.port;

const main = () => {
  // DB Connection
  // initDB();

  // Server Activation MSG
  app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
      message: "DevPluse Server is running successfully!",
      author: "Eftajul Islam Shadi",
    });
  });

  // Server Activation
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

main();
