import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { issueService } from "./issue.service";

// Create Issue Controller
const createIssue = async (req: Request, res: Response) => {
  const user = req.user;

  const payload = {
    reporter_id: user?.id,
    ...req.body,
  };

  try {
    const result = await issueService.createIssueIntoDB(payload);

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