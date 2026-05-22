import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { issueService } from "./issue.service";


const createIssue = (req: Request, res: Response) => {
  try {
    const result = issueService.createIssueIntoDB(req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue created successfully",
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


export const issueController = {
  createIssue,
};