import type { TIssue } from "../../types/issue";
import { sql } from "../../db";
import { issueStatus, issueType } from "../../types/issue";

// Create Issue Service
const createIssueIntoDB = async (payload: TIssue) => {
 const  {title, description, type, status, reporter_id} = payload;

//  TODO: Issue Type Validation
 if (!type || issueType[type] === undefined) {
  throw new Error("Invalid Issue Type Provided. Please try with valid issue type!");
 }

//  TODO: Issue Status Validation
 if (status && issueStatus[status] === undefined) {
  throw new Error("Invalid Issue Status Provided. Please try with valid issue status!");
 }


 const result = await sql`
  INSERT INTO issues (id, title, description, type, status, reporter_id, created_at, updated_at) VALUES (DEFAULT, ${title}, ${description}, ${type}, COALESCE(${status || null}, 'open'), ${reporter_id}, NOW(), NOW()) RETURNING *
 `;

 return result[0];
}

export const issueService = {
  createIssueIntoDB,
};