import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import CookieParser from "cookie-parser";
import globalErrorHandler from "./middleware/globalErrorHandler";
import { authRoute } from "./modules/auth/auth.route";
import { issueRoute } from "./modules/issues/issue.route";

const app: Application = express();

app.use(express.json());
app.use(CookieParser());


// Auth Routes
app.use("/api/auth", authRoute);

// Issue Routes
app.use("/api/issues", issueRoute);

// Server Activation MSG
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "DevPluse Server is running successfully!",
    author: "Eftajul Islam Shadi",
  });
});

// Global Error Handler in last cause every route handler and middleware will be executed before this
app.use(globalErrorHandler);

export default app;
