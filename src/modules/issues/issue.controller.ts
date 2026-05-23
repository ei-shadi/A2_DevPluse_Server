import { authController } from './../auth/auth.controller';
import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { issueService } from "./issue.service";

// Get All Issues Controller
const getAllIssues = async (req: Request, res: Response) => {
  try {
    
    const { sort, type, status } = req.query;
    
    const result = await issueService.getAllIssuesFromDB({
      sort: sort as string,
      type: type as string,
      status: status as string,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issues fetched successfully",
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

// Get Single Issue By Id authController
const getIssueById = async (req: Request, res: Response) => {
  try {
    const result = await issueService.getIssueByIdFromDB(req.params.id as string);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue fetched successfully",
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

// Update Issue Controller
const updateIssue = async (req: Request, res: Response) => {
  try {
    const issueId = req.params.id as string;
    const currentUser = req.user;
    const updateData = req.body;

    const result = await issueService.updateIssueInDB(issueId, currentUser, updateData);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Issue updated successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: error.statusCode || 500,
      success: false,
      message: error.message,
    });
  }
};


export const issueController = {
  createIssue,
  getAllIssues,
  getIssueById,
  updateIssue,
};
