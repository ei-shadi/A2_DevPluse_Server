import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";

const registration = async (req: Request, res: Response) => {
  try {
    const result = await authService.registerUserIntoDB(req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User registered successful",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

export const authController = {
  registration,
};
