import express, { type Application, type Request, type Response } from 'express'
import globalErrorHandler from './middleware/globalErrorHandler';

const app: Application = express();

app.use(express.json());
app.use(globalErrorHandler);


export default app;